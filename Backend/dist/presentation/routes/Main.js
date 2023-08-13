"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MainController_1 = __importDefault(require("../controllers/MainController"));
const MainRoute = (0, express_1.Router)();
MainRoute.get('/', MainController_1.default.Get);
MainRoute.get('/teste', MainController_1.default.Test);
exports.default = MainRoute;
//# sourceMappingURL=Main.js.map