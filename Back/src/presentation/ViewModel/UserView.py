from domain.Entities.Roles import Roles;

class UserView:
    email:str;
    firstName:str;
    lastName:str;
    roles:list[Roles];
    def __init__(self) -> None:
        self.email = "";
        self.firstName = "";
        self.lastName = "";
        self.roles = [];
    def as_dict(self):
        return {
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'roles': [role.__dict__ for role in self.roles]
        }
