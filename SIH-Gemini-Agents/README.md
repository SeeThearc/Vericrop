# SIH-Gemini-Agents

AI-powered supply chain quality control and fraud detection system using Google's Gemini 2.5 Pro vision model.

## Features

### 🏭 Package Quality Inspection

- **Structural Damage Detection**: Identifies dents, cracks, tears, and holes in packaging
- **Surface Analysis**: Detects contamination, stains, and deformation
- **Integrity Assessment**: Evaluates overall suitability for shipping and storage
- **Package Type Recognition**: Automatically identifies carton, bottle, box, or container types
- **Confidence Scoring**: Provides confidence percentage for inspection results

### 🔍 Supply Chain Fraud Detection

- **Product Substitution Detection**: Identifies when wrong products are shipped
- **Quantity Verification**: Counts and compares actual vs expected item quantities
- **Label Authentication**: Detects fake or suspicious packaging labels
- **Counterfeit Detection**: Identifies imitation or low-quality products
- **Batch Processing**: Analyze multiple shipments simultaneously

## Prerequisites

- Python 3.8 or higher
- Google Gemini API key
- Image files (JPEG, PNG) of packages/shipments

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abeer555/SIH-Gemini-Agents.git
   cd SIH-Gemini-Agents
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```
   Gemini_API=your_gemini_api_key_here
   ```

## Usage

### Package Quality Inspection

**Single Package Inspection:**

```python
from cartons import inspect_package

# Inspect a single package
result = inspect_package("package_image.jpg")
print(f"Package is {'good' if result else 'damaged'} for usage")
```

**Run the inspection script:**

```bash
python cartons.py
```

### Fraud Detection

**Single Shipment Analysis:**

```python
from fraud_detection import detect_fraud

# Detect fraud in a shipment
result = detect_fraud(
    image_path="dragonfruit.png",
    expected_product="dragon fruit",
    expected_quantity=18,
    invoice_number="INV2024001"
)

if result['is_fraudulent']:
    print(f"Fraud detected: {result['fraud_type']}")
else:
    print("Shipment appears legitimate")
```

**Batch Processing:**

```python
from fraud_detection import batch_fraud_detection

# Process multiple shipments
shipments = [
    {'image': 'shipment1.jpg', 'product': 'dragon fruit', 'quantity': 10, 'invoice': 'INV001'},
    {'image': 'shipment2.jpg', 'product': 'apple', 'quantity': 20, 'invoice': 'INV002'},
]

results = batch_fraud_detection(shipments, "shipments/")
```

**Run the fraud detection script:**

```bash
python fraud_detection.py
```

## API Response Format

### Package Inspection Response

```json
{
  "is_good_for_usage": true,
  "package_type": "carton",
  "confidence_score": 95
}
```

### Fraud Detection Response

```json
{
  "is_fraudulent": false,
  "expected_product": "dragon fruit",
  "actual_product": "dragon fruit",
  "expected_quantity": 18,
  "actual_quantity": 18,
  "fraud_type": "legitimate",
  "confidence_score": 0.92
}
```

## Configuration

### Environment Variables

- `Gemini_API`: Your Google Gemini API key (required)

### Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- BMP (.bmp)
- TIFF (.tiff)

## Project Structure

```
SIH-Gemini-Agents/
├── cartons.py              # Package quality inspection
├── fraud_detection.py      # Supply chain fraud detection
├── requirements.txt        # Python dependencies
├── README.md              # This file
├── .env                   # Environment variables (create this)
├── package_image.jpg      # Sample package image
├── dragonfruit.png        # Sample shipment image
├── sample_carton.jpg      # Additional sample
├── strawberry.jpg         # Additional sample
└── test_outputs.txt       # Test results log
```

## Error Handling

The system includes comprehensive error handling for:

- Missing image files
- API connection issues
- Invalid API responses
- Network timeouts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Google's Gemini 2.5 Pro vision model
- Part of SIH (Smart India Hackathon) initiative
- Uses advanced AI for supply chain automation
