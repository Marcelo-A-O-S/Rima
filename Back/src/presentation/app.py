from flask import Flask;
from flask_cors import CORS
from presentation.Controllers.TypesRolesController import typesRolesController;
from presentation.Controllers.RolesController import rolesController;
from presentation.Controllers.EmployeeController import employeeController;
from presentation.Controllers.AuthenticationController import authenticationController;
class App:
    def __init__(self) -> None:
        self.app = Flask(__name__);
        CORS(self.app);
        self.Configuration();
        self.Routes();
        self.init();

    def Routes(self):
        self.app.register_blueprint(typesRolesController);
        self.app.register_blueprint(rolesController);
        self.app.register_blueprint(employeeController);
        self.app.register_blueprint(authenticationController);
        return
    def Configuration(self):
        self.app.config['CORS_HEADERS'] = ['Content-Type', 'Authorization']
        return
    def init(self):
        print(__name__)
        print("Iniciando servidor...")
        self.app.run(port= 4073);
