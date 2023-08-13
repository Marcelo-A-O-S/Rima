"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Main_1 = __importDefault(require("./routes/Main"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const EmployeeRoute_1 = __importDefault(require("./routes/EmployeeRoute"));
const RolesRoute_1 = require("./routes/RolesRoute");
class App {
    constructor(props) {
        this.server = (0, express_1.default)();
        this.port = props.port;
        this.listen(this.port);
        this.middleware();
        this.routes();
    }
    getApp() {
        return this.server;
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`Escutando na porta: http://localhost:${port}`);
        });
    }
    middleware() {
        this.server.use(express_1.default.json());
        this.server.use((0, cors_1.default)());
    }
    routes() {
        this.server.use('/', Main_1.default);
        this.server.use('/auth', Auth_1.default);
        this.server.use('/employee', EmployeeRoute_1.default);
        this.server.use('/roles', (0, RolesRoute_1.rolesRouteFactory)());
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map