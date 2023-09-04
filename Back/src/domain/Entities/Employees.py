class Employees:
    id:int;
    firstName:str;
    lastName:str;
    email:str;
    def __init__(self, _id, _firstName, _lastName, _email)->None:
        self.id = _id;
        self.firstName = _firstName;
        self.lastName = _lastName;
        self.email = _email;
