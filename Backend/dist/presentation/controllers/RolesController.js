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
const RolesServices_1 = __importDefault(require("../../services/RolesServices"));
class RolesController {
    //private rolesServices : IServicesRoles
    constructor(rolesServices = new RolesServices_1.default()) {
        this.rolesServices = rolesServices;
    }
    CreateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, roleName } = req.body;
            const role = new domain_1.Roles({
                roleName: roleName,
                id: id
            });
            console.log(role);
            const result = yield this.rolesServices.Save(role);
            return res.json(result);
        });
    }
    UpdateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roleName } = req.body;
            const role = new domain_1.Roles({
                roleName: roleName,
                id: 0
            });
            return res.json();
        });
    }
    GetRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.rolesServices.GetAll();
            return res.json(result);
        });
    }
    TesteRolesServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.rolesServices.GetAll();
            return res.json();
        });
    }
}
exports.default = RolesController;
//# sourceMappingURL=RolesController.js.map