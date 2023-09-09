from services.utils.CreateTypeRoles import CreateTypeRoles;
from services.utils.CreateRoles import CreateRoles;
from services.utils.InitializeUsersAdmin import InitializeUsersAdmin;
async def InitializeServices():
    await CreateTypeRoles();
    await CreateRoles();
    await InitializeUsersAdmin();
    return

