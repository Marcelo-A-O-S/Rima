"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRouteFactory = void 0;
const express_1 = require("express");
const RolesController_1 = __importDefault(require("../controllers/RolesController"));
const RolesServices_1 = __importDefault(require("../../services/RolesServices"));
const rolesRouteFactory = () => {
    const rolesRoute = (0, express_1.Router)();
    const rolesServices = new RolesServices_1.default();
    const rolesController = new RolesController_1.default();
    rolesRoute.get('/', rolesController.GetRole);
    rolesRoute.post('/create', rolesController.CreateRole);
    rolesRoute.post('/update', rolesController.UpdateRole);
    return rolesRoute;
};
exports.rolesRouteFactory = rolesRouteFactory;
//# sourceMappingURL=RolesRoute.js.map