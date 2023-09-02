"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeController_1 = __importDefault(require("../controllers/EmployeeController"));
const employeeRoute = (0, express_1.Router)();
employeeRoute.post('/create', EmployeeController_1.default.CreateEmployee);
employeeRoute.get('/list', EmployeeController_1.default.ListEmployees);
exports.default = employeeRoute;
//# sourceMappingURL=EmployeeRoute.js.map