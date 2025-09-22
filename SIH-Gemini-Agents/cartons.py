from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

# Schema for package inspection results
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

def inspect_package(image_path="destroyed_carton_image.jpg"):
    """
    Inspect a package (carton/bottle) image and return True/False for usage suitability
    
    Args:
        image_path (str): Path to the package image file
    
    Returns:
        bool: True if package is good for usage, False otherwise
    """
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("Gemini_API_KEY")
    
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")

    client = genai.Client(api_key=api_key)
    model = "gemini-2.5-flash"
    
    # Prepare image bytes
    IMAGE_MIME = "image/jpeg"
    try:
        with open(image_path, "rb") as f:
            image_bytes = f.read()
    except FileNotFoundError:
        print(f"Error: Image file '{image_path}' not found.")
        return False

    # Create content with detailed inspection prompt
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
                types.Part.from_bytes(data=image_bytes, mime_type=IMAGE_MIME),
            ],
        ),
    ]
    
    # Configure response format
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_json_schema=package_inspection_schema,
    )

    try:
        # Generate inspection result
        response = client.models.generate_content(
            model=model,
            contents=contents,
            config=generate_content_config,
        )
        
        # Parse the JSON response
        import json
        result = json.loads(response.text)
        
        # Print inspection details
        print(f"Package Type: {result.get('package_type', 'Unknown')}")
        print(f"Good for Usage: {result.get('is_good_for_usage', False)}")
        print(f"Confidence Score: {result.get('confidence_score', 0)}%")
        
        # Return the boolean result
        return result.get('is_good_for_usage', False)
        
    except Exception as e:
        print(f"Error during inspection: {e}")
        return False

def batch_inspect_packages(image_folder="packages/"):
    """
    Inspect multiple package images in a folder
    
    Args:
        image_folder (str): Path to folder containing package images
    
    Returns:
        dict: Results for each image file
    """
    results = {}
    
    if not os.path.exists(image_folder):
        print(f"Error: Folder '{image_folder}' not found.")
        return results
    
    # Get all image files
    image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']
    image_files = [f for f in os.listdir(image_folder) 
                   if any(f.lower().endswith(ext) for ext in image_extensions)]
    
    print(f"Found {len(image_files)} images to inspect...")
    
    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)
        print(f"\nInspecting: {image_file}")
        result = inspect_package(image_path)
        results[image_file] = result
    
    return results

if __name__ == "__main__":
    # Single package inspection
    print("=== Single Package Inspection ===")
    is_good = inspect_package("package_image.jpg")  # Changed from "image.jpg"
    print(f"\nFinal Result: {'APPROVED' if is_good else 'REJECTED'}")
    
    # Uncomment below for batch processing
    # print("\n=== Batch Package Inspection ===")
    # batch_results = batch_inspect_packages("packages/")
    # 
    # print("\n=== Summary ===")
    # approved = sum(1 for result in batch_results.values() if result)
    # rejected = len(batch_results) - approved
    # print(f"Total Packages: {len(batch_results)}")
    # print(f"Approved: {approved}")
    # print(f"Rejected: {rejected}")