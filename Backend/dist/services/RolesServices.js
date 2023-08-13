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
const GenericResult_1 = require("../data/Generics/Enums/GenericResult");
const domain_1 = require("../domain");
const RolesRepository_1 = __importDefault(require("./repositories/RolesRepository"));
class RolesServices {
    constructor() {
        this.rolesRepository = new RolesRepository_1.default();
    }
    update(entity) {
        throw new Error("Method not implemented.");
    }
    GetRoles(Roles) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = [];
            console.log("Funcionando");
            return roles;
        });
    }
    Save(role) {
        return __awaiter(this, void 0, void 0, function* () {
            let Erro = '';
            try {
                if (role.id === 0) {
                    let result = yield this.rolesRepository.save(role);
                    if (result === GenericResult_1.GenericResult.Sucess) {
                        return "Função salva com sucesso";
                    }
                }
                else {
                    let result = yield this.rolesRepository.update(role);
                    if (result === GenericResult_1.GenericResult.Sucess) {
                        return "Função Atualizada com sucesso";
                    }
                }
                return "Erro ao salvar/atualizar o Função";
            }
            catch (err) {
                return `${err}`;
            }
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let rolesList = [];
            var result = yield this.rolesRepository.listAll('Roles');
            result.map(element => {
                const role = new domain_1.Roles({
                    id: element.id,
                    roleName: element.roleName
                });
                rolesList.push(role);
            });
            return rolesList;
        });
    }
}
exports.default = RolesServices;
//# sourceMappingURL=RolesServices.js.map