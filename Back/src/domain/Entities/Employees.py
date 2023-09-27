import uuid

class Employees:
    id:int;
    firstName:str;
    lastName:str;
    code:str;
    def __init__(self, _id, _firstName, _lastName)->None:
        self.id = _id;
        self.firstName = _firstName;
        self.lastName = _lastName;

    async def generateCode(self):
        self.code = str(uuid.uuid4());

    async def GetCode(self):
        return self.code;

    async def SetCode(self, code:str):
        self.code = code;
