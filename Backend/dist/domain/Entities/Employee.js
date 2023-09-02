"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const crypto = __importStar(require("crypto"));
const AlgoritmoHash_1 = require("../Enums/AlgoritmoHash");
const Format_1 = require("../Enums/Format");
class Employee {
    constructor(propEmployee) {
        this.id = propEmployee.id;
        this.firstName = propEmployee.firstName;
        this.lastName = propEmployee.lastName;
        this.email = propEmployee.email;
        this.PasswordHash = "";
        this.PasswordSalt = "";
    }
    createPasswordSalt() {
        let length = 16;
        this.PasswordSalt = crypto.randomBytes(Math.ceil(length / 2)).toString(Format_1.Format.Hex).slice(0, length);
    }
    createPasswordHash(password) {
        this.createPasswordSalt();
        const hash = crypto.createHash(AlgoritmoHash_1.AlgoritmoHash.SHA256);
        const hashIcludeSalt = this.PasswordSalt + password;
        hash.update(hashIcludeSalt);
        this.PasswordHash = hash.digest(Format_1.Format.Hex);
    }
    verifyPasswordHash(password) {
        const hash = crypto.createHash(AlgoritmoHash_1.AlgoritmoHash.SHA256);
        const hashIcludeSalt = this.PasswordSalt + password;
        hash.update(hashIcludeSalt);
        const passwordHashCurrent = hash.digest(Format_1.Format.Hex);
        if (this.PasswordHash === passwordHashCurrent) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map