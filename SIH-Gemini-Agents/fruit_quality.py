from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

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
def generate():
    # Load environment variables from .env file
    load_dotenv(override=True)
    
    # Get the API key from environment variables
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("Gemini_API_KEY")
    
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    client = genai.Client(api_key=api_key)

    model = "gemini-2.5-pro"
    # prepare image bytes and prompt
    IMAGE_PATH = os.path.join(os.path.dirname(__file__), "strawberry.jpg")
    IMAGE_MIME = "image/jpeg"
    with open(IMAGE_PATH, "rb") as f:
        image_bytes = f.read()

    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="find the health and crop name"),
                types.Part.from_bytes(data=image_bytes, mime_type=IMAGE_MIME),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_json_schema=user_profile,
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        print(chunk.text, end="")

if __name__ == "__main__":
    generate()