# AgriTrace ML API

A FastAPI-based REST API that provides endpoints for agricultural supply chain machine learning models.

## Features

- **Carton Damage Detection**: Analyze carton/package images to detect damage
- **Fraud Detection**: Compare expected vs actual products in images
- **Fruit Quality Grading**: Grade fruit quality from A-C based on health scores

## Installation

1. Install dependencies:

```bash
pip install -r requirements_api.txt
```

2. Set up environment variables:
   Create a `.env` file with:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Running the API

```bash
python app.py
```

Or using uvicorn directly:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### 1. Carton Damage Detection

**POST** `/detect-carton-damage`

Upload a carton/package image to check for damage.

**Parameters:**

- `image` (file): Image of carton/package

**Response:**

```json
{
  "is_damaged": false,
  "package_type": "carton",
  "confidence_score": 95.5,
  "message": "Carton damage detection completed successfully"
}
```

### 2. Fraud Detection

**POST** `/detect-fraud`

Compare expected product with actual product in image.

**Parameters:**

- `image` (file): Image of product
- `expected_product` (form): Expected product name (e.g., "strawberry")

**Response:**

```json
{
  "is_fraudulent": false,
  "expected_product": "strawberry",
  "actual_product": "strawberry",
  "fraud_type": "legitimate",
  "confidence_score": 0.92,
  "message": "Fraud detection completed successfully"
}
```

### 3. Fruit Quality Grading

**POST** `/grade-fruit-quality`

Analyze fruit quality and return health score with letter grade.

**Parameters:**

- `image` (file): Image of fruit

**Response:**

```json
{
  "health_score": 85,
  "grade": "A",
  "crop_type": "strawberry",
  "message": "Fruit quality analysis completed successfully"
}
```

## Grading System

- **Grade A**: Health score 80-100% (Excellent quality)
- **Grade B**: Health score 60-79% (Good quality)
- **Grade C**: Health score 0-59% (Poor quality)

## Example Usage with cURL

```bash
# Test carton damage detection
curl -X POST "http://localhost:8000/detect-carton-damage" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@package_image.jpg"

# Test fraud detection
curl -X POST "http://localhost:8000/detect-fraud" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@strawberry.jpg" \
  -F "expected_product=strawberry"

# Test fruit quality grading
curl -X POST "http://localhost:8000/grade-fruit-quality" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@strawberry.jpg"
```

## Error Handling

The API includes comprehensive error handling:

- File validation (images only)
- Temporary file cleanup
- Detailed error messages
- HTTP status codes

## Dependencies

See `requirements_api.txt` for complete list of dependencies.
