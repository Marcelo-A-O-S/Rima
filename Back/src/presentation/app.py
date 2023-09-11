from flask import Flask;
from presentation.Controllers.TypesRolesController import typesRolesController;
from presentation.Controllers.RolesController import rolesController;
from presentation.Controllers.EmployeeController import employeeController;
class App:
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.Routes();
        self.init();

    def Routes(self):
        self.app.register_blueprint(typesRolesController);
        self.app.register_blueprint(rolesController);
        self.app.register_blueprint(employeeController);
        return

    def init(self):
        print(__name__)
        print("Iniciando servidor...")
        self.app.run(port= 4073);
