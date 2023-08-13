"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AuthRoute = (0, express_1.Router)();
AuthRoute.post('/login', AuthController_1.default.Login);
exports.default = AuthRoute;
//# sourceMappingURL=Auth.js.map