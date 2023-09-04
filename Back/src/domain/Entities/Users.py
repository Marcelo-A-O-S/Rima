import os
import hashlib
class Users:
    id:int;
    employeeid:int;
    passwordHash:str;
    passwordSalt:str;
    def __init__(self, _id, _employeeid):
        self.id = _id;
        self.employeeid = _employeeid;

    async def createPasswordHash(self, password):
        await self.createPasswordSalt();
        data_with_salt = password + self.passwordSalt;
        hasher = hashlib.sha256();
        hasher.update(data_with_salt.encode("utf-8"));
        self.passwordHash = hasher.hexdigest();

    async def createPasswordSalt(self):
        salt = os.urandom(16);
        self.passwordSalt = salt.hex();

    async def verifyPasswordHash(self, password):
        data_with_salt = password + self.passwordSalt;
        hasher = hashlib.sha256();
        hasher.update(data_with_salt.encode("utf-8"));
        hash_create = hasher.hexdigest()
        if self.passwordHash == hash_create:
            return True
        else:
            return False
