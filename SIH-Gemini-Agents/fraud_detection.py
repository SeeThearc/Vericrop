from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

# Schema for fraud detection results
fraud_detection_schema = {
    'properties': {
        'is_fraudulent': {
            'type': 'boolean',
            'title': 'Fraud Detection Status',
            'description': 'True if fraud is detected (product substitution, fake labels), False if legitimate',
        },
        'expected_product': {
            'type': 'string',
            'title': 'Expected Product',
            'description': 'The product that was supposed to be in the shipment according to label/invoice',
        },
        'actual_product': {
            'type': 'string', 
            'title': 'Actual Product',
            'description': 'The actual product found in the image',
        },
        'fraud_type': {
            'type': 'string',
            'title': 'Type of Fraud',
            'description': 'Type of fraud detected: product_substitution, fake_label, counterfeit, or legitimate',
        },
        'confidence_score': {
            'type': 'number',
            'minimum': 0,
            'maximum': 1,
            'title': 'Confidence Score',
            'description': 'Confidence level of fraud detection (0.0 to 1.0)',
        }
    },
    'required': ['is_fraudulent', 'expected_product', 'actual_product', 'fraud_type', 'confidence_score'],
    'title': 'Supply Chain Fraud Detection',
    'type': 'object',
}

def detect_fraud(image_path, expected_product, invoice_number=None):
    """
    Detect fraud in supply chain shipments by comparing expected vs actual products
    
    Args:
        image_path (str): Path to the shipment image
        expected_product (str): Product that should be in the shipment
        invoice_number (str): Optional invoice/order number for reference
    
    Returns:
        dict: Fraud detection results with boolean fraud status
    """
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("Gemini_API_KEY")
    
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")

    client = genai.Client(api_key=api_key)
    model = "gemini-2.5-pro"
    
    # Prepare image bytes
    IMAGE_MIME = "image/jpeg"
    try:
        with open(image_path, "rb") as f:
            image_bytes = f.read()
    except FileNotFoundError:
        print(f"Error: Image file '{image_path}' not found.")
        return {
            'is_fraudulent': True,
            'fraud_type': 'image_not_found',
            'confidence_score': 1.0
        }

    # Create detailed fraud detection prompt
    fraud_prompt = f"""SUPPLY CHAIN FRAUD DETECTION ANALYSIS

    EXPECTED SHIPMENT DETAILS:
    - Product: {expected_product}
    - Invoice/Order: {invoice_number or 'N/A'}

    FRAUD DETECTION INSTRUCTIONS:
    Carefully analyze this shipment image for the following types of fraud:

    1. PRODUCT SUBSTITUTION:
       - Check if actual products match expected products
       - Look for different fruits, vegetables, or items than specified
       - Example: Expected dragon fruits but found apples

    2. FAKE LABELS/PACKAGING:
       - Check for suspicious or mismatched labels
       - Look for poor quality printing or incorrect branding
       - Verify product labeling consistency

    3. COUNTERFEIT PRODUCTS:
       - Check for signs of fake or imitation products
       - Look for quality inconsistencies
       - Verify brand authenticity markers

    4. VISUAL QUALITY ISSUES:
       - Look for products that don't match expected grade/quality
       - Check for substitution with lower quality items

    ANALYSIS REQUIREMENTS:
    - Identify the actual product type in the image
    - Compare with expected: {expected_product}
    - Determine fraud type if any discrepancy exists
    - Provide confidence score based on clarity of evidence
    - Return TRUE for is_fraudulent if the product doesn't match expected

    Be thorough and precise in your analysis."""

    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=fraud_prompt),
                types.Part.from_bytes(data=image_bytes, mime_type=IMAGE_MIME),
            ],
        ),
    ]
    
    # Configure response format
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_json_schema=fraud_detection_schema,
    )

    try:
        # Generate fraud detection result
        response = client.models.generate_content(
            model=model,
            contents=contents,
            config=generate_content_config,
        )
        
        # Parse the JSON response
        import json
        result = json.loads(response.text)
        
        # Print detailed analysis
        print(f"\n=== FRAUD DETECTION REPORT ===")
        print(f"Expected: {expected_product}")
        print(f"Found: {result.get('actual_product', 'Unknown')}")
        print(f"Fraud Detected: {'YES' if result.get('is_fraudulent') else 'NO'}")
        print(f"Fraud Type: {result.get('fraud_type', 'N/A')}")
        print(f"Confidence: {result.get('confidence_score', 0):.2f}")
        
        if result.get('is_fraudulent'):
            print(f"🚨 ALERT: Potential fraud detected!")
        else:
            print(f"✅ Shipment appears legitimate")
            
        return result
        
    except Exception as e:
        print(f"Error during fraud detection: {e}")
        return {
            'is_fraudulent': True,
            'expected_product': expected_product,
            'actual_product': 'Error',
            'fraud_type': 'analysis_error',
            'confidence_score': 0.0
        }

def batch_fraud_detection(shipments_data, images_folder="shipments/"):
    """
    Perform fraud detection on multiple shipments
    
    Args:
        shipments_data (list): List of dicts with shipment info
            Example: [{'image': 'shipment1.jpg', 'product': 'dragon fruit', 'invoice': 'INV001'}]
        images_folder (str): Folder containing shipment images
    
    Returns:
        dict: Results for each shipment
    """
    results = {}
    fraud_count = 0
    
    print(f"=== BATCH FRAUD DETECTION ===")
    print(f"Processing {len(shipments_data)} shipments...\n")
    
    for i, shipment in enumerate(shipments_data, 1):
        image_path = os.path.join(images_folder, shipment['image'])
        print(f"[{i}/{len(shipments_data)}] Analyzing: {shipment['image']}")
        
        result = detect_fraud(
            image_path=image_path,
            expected_product=shipment['product'],
            invoice_number=shipment.get('invoice', f'SHIP_{i:03d}')
        )
        
        results[shipment['image']] = result
        
        if result['is_fraudulent']:
            fraud_count += 1
            
        print("-" * 50)
    
    # Summary report
    print(f"\n=== FRAUD DETECTION SUMMARY ===")
    print(f"Total Shipments: {len(shipments_data)}")
    print(f"Fraudulent: {fraud_count}")
    print(f"Legitimate: {len(shipments_data) - fraud_count}")
    print(f"Fraud Rate: {(fraud_count/len(shipments_data)*100):.1f}%")
    
    return results

# Example usage functions
def quick_fraud_check(image_path, expected_product):
    """Simple wrapper that returns just True/False for fraud"""
    result = detect_fraud(image_path, expected_product)
    return result.get('is_fraudulent', True)

if __name__ == "__main__":
    # Example 1: Single fraud detection
    print("=== SINGLE SHIPMENT FRAUD DETECTION ===")
    
    # Example: Expected dragon fruit
    fraud_result = detect_fraud(
        image_path=os.path.join(os.path.dirname(__file__), "dragonfruit.png"),
        expected_product="dragon fruit",
        invoice_number="INV2024001"
    )
    
    # Simple boolean result
    is_fraud = fraud_result.get('is_fraudulent', True)
    print(f"\nFRAUD STATUS: {'DETECTED' if is_fraud else 'NOT DETECTED'}")
    
    # Example 2: Batch processing
    print("\n" + "="*60)
    print("=== BATCH FRAUD DETECTION EXAMPLE ===")
    
    # Sample shipments data
    sample_shipments = [
        {'image': 'shipment1.jpg', 'product': 'dragon fruit', 'invoice': 'INV001'},
        {'image': 'shipment2.jpg', 'product': 'apple', 'invoice': 'INV002'},
        {'image': 'shipment3.jpg', 'product': 'banana', 'invoice': 'INV003'},
        {'image': 'shipment4.jpg', 'product': 'orange', 'invoice': 'INV004'},
    ]
    
    # Uncomment to run batch detection
    # batch_results = batch_fraud_detection(sample_shipments, "shipments/")
    
    # Example 3: Quick check
    print("\n=== QUICK FRAUD CHECK ===")
    # is_fraudulent = quick_fraud_check("test_shipment.jpg", "mango", 25)
    # print(f"Quick check result: {is_fraudulent}")