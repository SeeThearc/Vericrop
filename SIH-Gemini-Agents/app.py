from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import tempfile
import os
import json
from dotenv import load_dotenv

# Import our ML model functions
from cartons import inspect_package
from fraud_detection import detect_fraud
from fruit_quality import generate as check_fruit_quality

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AgriTrace ML API",
    description="API endpoints for agricultural supply chain ML models",
    version="1.0.0"
)

# Response models
class CartonDamageResponse(BaseModel):
    is_damaged: bool
    package_type: str
    confidence_score: float
    message: str

class FraudDetectionResponse(BaseModel):
    is_fraudulent: bool
    expected_product: str
    actual_product: str
    fraud_type: str
    confidence_score: float
    message: str

class FruitQualityResponse(BaseModel):
    health_score: int
    grade: str
    crop_type: str
    message: str

# Helper function to save uploaded file temporarily
async def save_upload_file(upload_file: UploadFile) -> str:
    """Save uploaded file to temporary location and return path"""
    suffix = os.path.splitext(upload_file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
        content = await upload_file.read()
        tmp_file.write(content)
        return tmp_file.name

# Helper function to determine fruit grade based on health score
def get_fruit_grade(health_score: int) -> str:
    """Convert health score to letter grade"""
    if health_score >= 80:
        return "A"
    elif health_score >= 60:
        return "B"
    else:
        return "C"

@app.get("/")
async def root():
    return {"message": "VeriCrop ML API is running", "version": "1.0.0"}

@app.post("/detect-carton-damage", response_model=CartonDamageResponse)
async def detect_carton_damage(
    image: UploadFile = File(..., description="Carton/package image to inspect")
):
    """
    Detect if a carton/package is damaged or suitable for use
    
    Returns:
    - is_damaged: boolean indicating if carton is damaged
    - package_type: type of package detected
    - confidence_score: confidence percentage (0-100)
    """
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded file temporarily
        temp_path = await save_upload_file(image)
        
        try:
            # Modified cartons.py to return full result instead of just boolean
            # We'll need to modify the inspect_package function
            from google import genai
            from google.genai import types
            
            # Get API key
            api_key = os.getenv("GEMINI_API_KEY") or os.getenv("Gemini_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY not found in environment variables")
            
            client = genai.Client(api_key=api_key)
            model = "gemini-2.5-flash"
            
            # Read image
            with open(temp_path, "rb") as f:
                image_bytes = f.read()
            
            # Schema for package inspection
            package_inspection_schema = {
                'properties': {
                    'is_good_for_usage': {
                        'type': 'boolean',
                        'title': 'Package Quality Status',
                        'description': 'True if the carton/bottle is in good condition and suitable for use in supply chain, False if damaged or unsuitable',
                    },
                    'package_type': {  
                        'description': "Type of package detected (carton, bottle, box, container, etc.)",
                        'title': 'Package Type',
                        'type': 'string',
                    },
                    'confidence_score': {
                        'type': 'number',
                        'title': 'Confidence Score',
                        'description': 'Confidence level of the inspection result as a percentage (0-100)',
                        'minimum': 0,
                        'maximum': 100,
                    },
                },
                'required': ['is_good_for_usage', 'package_type', 'confidence_score'],
                'title': 'Package Quality Inspection',
                'type': 'object',
            }
            
            contents = [
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(
                            text="""Analyze this package image for supply chain quality control. 
                            
                            Inspect for:
                            - Structural damage (dents, cracks, tears, holes)
                            - Surface contamination or stains
                            - Deformation or crushing
                            - Missing parts or components
                            - Overall integrity for shipping/storage
                            
                            Determine if this package is suitable for use in supply chain operations.
                            Provide a confidence score (0-100%) for your assessment.
                            Return the package type, whether it's good for usage (true/false), and the confidence score."""
                        ),
                        types.Part.from_bytes(data=image_bytes, mime_type=image.content_type),
                    ],
                ),
            ]
            
            generate_content_config = types.GenerateContentConfig(
                response_mime_type="application/json",
                response_json_schema=package_inspection_schema,
            )
            
            response = client.models.generate_content(
                model=model,
                contents=contents,
                config=generate_content_config,
            )
            
            result = json.loads(response.text)
            is_damaged = not result.get('is_good_for_usage', False)
            
            return CartonDamageResponse(
                is_damaged=is_damaged,
                package_type=result.get('package_type', 'Unknown'),
                confidence_score=result.get('confidence_score', 0),
                message="Carton damage detection completed successfully"
            )
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        # Clean up temp file if it exists
        if 'temp_path' in locals():
            try:
                os.unlink(temp_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/detect-fraud", response_model=FraudDetectionResponse)
async def detect_fraud_endpoint(
    image: UploadFile = File(..., description="Fruit/product image to analyze"),
    expected_product: str = Form(..., description="Expected product type (e.g., 'strawberry', 'apple')")
):
    """
    Detect fraud by comparing expected product with actual product in image
    
    Returns:
    - is_fraudulent: boolean indicating if fraud is detected
    - expected_product: what was expected
    - actual_product: what was found
    - fraud_type: type of fraud detected
    - confidence_score: confidence level (0.0-1.0)
    """
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded file temporarily
        temp_path = await save_upload_file(image)
        
        try:
            # Use our fraud detection function
            result = detect_fraud(temp_path, expected_product.lower())
            
            return FraudDetectionResponse(
                is_fraudulent=result.get('is_fraudulent', True),
                expected_product=result.get('expected_product', expected_product),
                actual_product=result.get('actual_product', 'Unknown'),
                fraud_type=result.get('fraud_type', 'analysis_error'),
                confidence_score=result.get('confidence_score', 0.0),
                message="Fraud detection completed successfully"
            )
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        # Clean up temp file if it exists
        if 'temp_path' in locals():
            try:
                os.unlink(temp_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/grade-fruit-quality", response_model=FruitQualityResponse)
async def grade_fruit_quality(
    image: UploadFile = File(..., description="Fruit image to analyze for quality")
):
    """
    Analyze fruit quality and return health score with A/B/C grade
    
    Returns:
    - health_score: health percentage (0-100)
    - grade: letter grade (A/B/C)
    - crop_type: detected fruit type
    """
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded file temporarily
        temp_path = await save_upload_file(image)
        
        try:
            # We need to modify the fruit quality function to work with file path
            from google import genai
            from google.genai import types
            
            # Get API key
            api_key = os.getenv("GEMINI_API_KEY") or os.getenv("Gemini_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY not found in environment variables")
            
            client = genai.Client(api_key=api_key)
            model = "gemini-2.5-pro"
            
            # Read image
            with open(temp_path, "rb") as f:
                image_bytes = f.read()
            
            # Schema for fruit quality
            user_profile = {
                'properties': {
                    'health': {
                        'anyOf': [
                            {'maximum': 100, 'minimum': 0, 'type': 'integer'},
                            {'type': 'null'},
                        ],
                        'title': 'Health',
                        'description': 'Health of the crop/plant in percentage',
                    },
                    'crop': {  
                        'description': "Name of the crop/plant",
                        'title': 'Crop',
                        'type': 'string',
                    },
                },
                'required': ['health', 'crop'],
                'title': 'Crop Health and Name',
                'type': 'object',
            }
            
            contents = [
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(text="find the health and crop name"),
                        types.Part.from_bytes(data=image_bytes, mime_type=image.content_type),
                    ],
                ),
            ]
            
            generate_content_config = types.GenerateContentConfig(
                response_mime_type="application/json",
                response_json_schema=user_profile,
            )
            
            response = client.models.generate_content(
                model=model,
                contents=contents,
                config=generate_content_config,
            )
            
            result = json.loads(response.text)
            health_score = result.get('health', 0)
            crop_type = result.get('crop', 'Unknown')
            grade = get_fruit_grade(health_score)
            
            return FruitQualityResponse(
                health_score=health_score,
                grade=grade,
                crop_type=crop_type,
                message="Fruit quality analysis completed successfully"
            )
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        # Clean up temp file if it exists
        if 'temp_path' in locals():
            try:
                os.unlink(temp_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AgriTrace ML API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)