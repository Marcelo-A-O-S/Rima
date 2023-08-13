"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const EmployeeServices_1 = __importDefault(require("../../services/EmployeeServices"));
class EmployeeController {
    constructor() {
    }
    CreateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = req.body;
            const employee = new domain_1.Employee({
                firstName,
                lastName,
                email,
                id: 0
            });
            const employeeServices = new EmployeeServices_1.default();
            employee.createPasswordHash(password);
            const result = yield employeeServices.Save(employee);
            return res.json(result);
        });
    }
    ListEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json();
        });
    }
}
exports.default = new EmployeeController();
//# sourceMappingURL=EmployeeController.js.map