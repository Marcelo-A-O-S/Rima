from presentation import InitializePresentation
from data import InitializeDatabase
import asyncio
async def Main():
    await InitializeDatabase();
    await InitializePresentation();

asyncio.run(Main());
