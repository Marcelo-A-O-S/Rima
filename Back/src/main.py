from presentation import InitializePresentation
from data import InitializeDatabase
from services import InitializeServices
import asyncio
async def Main():
    await InitializeDatabase();
    await InitializeServices();
    await InitializePresentation();

asyncio.run(Main());
