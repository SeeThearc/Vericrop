import os
from prisma import Prisma
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Global Prisma client instance
prisma_client = None

def get_prisma_client() -> Prisma:
    """Get or create a Prisma client instance."""
    global prisma_client
    if prisma_client is None:
        prisma_client = Prisma()
    return prisma_client

async def connect_prisma():
    """Connect to the database."""
    client = get_prisma_client()
    if not client.is_connected():
        await client.connect()
    return client

async def disconnect_prisma():
    """Disconnect from the database."""
    client = get_prisma_client()
    if client.is_connected():
        await client.disconnect()
