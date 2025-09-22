#!/usr/bin/env python3
"""
Test client for AgriTrace ML API

This script demonstrates how to call the API endpoints
"""

import requests
import os

# API base URL
BASE_URL = "http://localhost:8000"

def test_carton_damage(image_path):
    """Test carton damage detection endpoint"""
    print(f"Testing carton damage detection with: {image_path}")
    
    url = f"{BASE_URL}/detect-carton-damage"
    
    try:
        with open(image_path, 'rb') as f:
            files = {'image': f}
            response = requests.post(url, files=files)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Carton Damage Detection Result:")
            print(f"   Is Damaged: {result['is_damaged']}")
            print(f"   Package Type: {result['package_type']}")
            print(f"   Confidence: {result['confidence_score']}%")
            print(f"   Message: {result['message']}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            
    except FileNotFoundError:
        print(f"❌ Error: Image file '{image_path}' not found")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("-" * 50)

def test_fraud_detection(image_path, expected_product):
    """Test fraud detection endpoint"""
    print(f"Testing fraud detection with: {image_path}")
    print(f"Expected product: {expected_product}")
    
    url = f"{BASE_URL}/detect-fraud"
    
    try:
        with open(image_path, 'rb') as f:
            files = {'image': f}
            data = {'expected_product': expected_product}
            response = requests.post(url, files=files, data=data)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Fraud Detection Result:")
            print(f"   Is Fraudulent: {result['is_fraudulent']}")
            print(f"   Expected: {result['expected_product']}")
            print(f"   Actual: {result['actual_product']}")
            print(f"   Fraud Type: {result['fraud_type']}")
            print(f"   Confidence: {result['confidence_score']}")
            print(f"   Message: {result['message']}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            
    except FileNotFoundError:
        print(f"❌ Error: Image file '{image_path}' not found")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("-" * 50)

def test_fruit_quality(image_path):
    """Test fruit quality grading endpoint"""
    print(f"Testing fruit quality grading with: {image_path}")
    
    url = f"{BASE_URL}/grade-fruit-quality"
    
    try:
        with open(image_path, 'rb') as f:
            files = {'image': f}
            response = requests.post(url, files=files)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Fruit Quality Result:")
            print(f"   Health Score: {result['health_score']}/100")
            print(f"   Grade: {result['grade']}")
            print(f"   Crop Type: {result['crop_type']}")
            print(f"   Message: {result['message']}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            
    except FileNotFoundError:
        print(f"❌ Error: Image file '{image_path}' not found")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("-" * 50)

def test_health_check():
    """Test health check endpoint"""
    print("Testing health check endpoint...")
    
    url = f"{BASE_URL}/health"
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Health Check Result:")
            print(f"   Status: {result['status']}")
            print(f"   Service: {result['service']}")
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("-" * 50)

def main():
    """Main test function"""
    print("=" * 50)
    print("AgriTrace ML API Test Client")
    print("=" * 50)
    
    # Test health check first
    test_health_check()
    
    # Test with sample images (adjust paths as needed)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Test carton damage detection
    package_image = os.path.join(current_dir, "package_image.jpg")
    if os.path.exists(package_image):
        test_carton_damage(package_image)
    else:
        print(f"Skipping carton test - {package_image} not found")
    
    # Test fraud detection
    strawberry_image = os.path.join(current_dir, "strawberry.jpg")
    if os.path.exists(strawberry_image):
        test_fraud_detection(strawberry_image, "strawberry")
    else:
        print(f"Skipping fraud test - {strawberry_image} not found")
    
    # Test fruit quality
    dragonfruit_image = os.path.join(current_dir, "dragonfruit.png")
    if os.path.exists(dragonfruit_image):
        test_fruit_quality(dragonfruit_image)
    elif os.path.exists(strawberry_image):
        test_fruit_quality(strawberry_image)
    else:
        print("Skipping fruit quality test - no fruit images found")
    
    print("=" * 50)
    print("Testing completed!")
    print("Make sure the API server is running on http://localhost:8000")
    print("Start the server with: python app.py")

if __name__ == "__main__":
    main()