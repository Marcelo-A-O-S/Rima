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
Object.defineProperty(exports, "__esModule", { value: true });
const GenericResult_1 = require("../data/Generics/Enums/GenericResult");
const domain_1 = require("../domain");
const EmployeeRepository_1 = require("./repositories/EmployeeRepository");
class EmployeeServices {
    constructor() {
        this.employeeRepository = new EmployeeRepository_1.EmployeeRepository();
    }
    Save(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            let Erro = '';
            try {
                if (employee.id === 0) {
                    let result = yield this.employeeRepository.save(employee);
                    if (result === GenericResult_1.GenericResult.Sucess) {
                        return "Funcionário salvo com sucesso";
                    }
                }
                else {
                    let result = yield this.employeeRepository.update(employee);
                    if (result === GenericResult_1.GenericResult.Sucess) {
                        return "Funcionário Atualizado com sucesso";
                    }
                }
                return "Erro ao salvar/atualizar o funcionário";
            }
            catch (err) {
                return `${err}`;
            }
        });
    }
    ListAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = new domain_1.Employee({
                email: "",
                firstName: "",
                lastName: "",
                id: 0
            });
            const listEmployee = [];
            var list = this.employeeRepository.listAll(employee.constructor.name);
            return listEmployee;
        });
    }
}
exports.default = EmployeeServices;
//# sourceMappingURL=EmployeeServices.js.map