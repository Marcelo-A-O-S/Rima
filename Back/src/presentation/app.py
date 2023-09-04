from flask import Flask

class App:
    def __init__(self) -> None:
        self.app = Flask(__name__)
        self.Routes();
        self.init();

    def Routes(self):
        return

    def init(self):
        print(__name__)
        print("Iniciando servidor...")
        self.app.run(port= 4073);
