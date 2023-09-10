from flask import Flask
from presentation.Controllers.TypesRolesController import typesRolesController
class App:
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.Routes();
        self.init();

    def Routes(self):
        self.app.register_blueprint(typesRolesController)
        return

    def init(self):
        print(__name__)
        print("Iniciando servidor...")
        self.app.run(port= 4073);
