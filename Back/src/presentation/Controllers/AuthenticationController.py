from flask import  Blueprint, jsonify, request;
import json;
from domain.Entities.Roles import Roles;
from services.EmployeesServices import EmployeesServices;
from services.UsersServices import UsersServices;
from services.RolesServices import RolesServices;
from services.EmployeeRolesServices import EmployeeRolesServices;
from presentation.ViewModel.LoginView import LoginView;
from presentation.ViewModel.UserView import UserView;

authenticationController = Blueprint('AuthenticationController',__name__);


@authenticationController.route('/auth/register', methods = ["POST"])
async def Register():
    try:
        data = json.loads(request.data);
    except Exception as ex:
        return jsonify(ex), 500;

@authenticationController.route('/auth/login', methods=["POST"])
async def Login():
    try:
        data = json.loads(request.data);
        if data['email'] != "":
            if data['password'] != "":
                userview = UserView();
                emploservices = EmployeesServices();
                userservices = UsersServices();
                roleservices = RolesServices();
                emploroleservices = EmployeeRolesServices();
                check:bool;
                exists = await emploservices.VerifyEmailExists(data['email']);
                if exists != False:
                    employee = await emploservices.GetByEmail(data['email']);
                    check = await userservices.VerifyExistsByEmployeeId(employee.id);
                    if check != False:
                        user = await userservices.GetByEmployeeId(employee.id);
                        check = await user.verifyPasswordHash(data['password']);
                        if check != False:
                            lista = await emploroleservices.GetAllByEmployeeId(employee.id);
                            if lista.__len__() > 0:
                                for item in lista:
                                    role : Roles = await roleservices.GetById(item.roleid);
                                    userview.roles.append(role);
                                userview.email = employee.email;
                                userview.firstName = employee.firstName;
                                userview.lastName = employee.lastName;
                                return jsonify(userview.as_dict());
                            else:
                                return jsonify("Não Autorizado"),401;
                        else:
                            return jsonify('Credenciais informadas estão incorretas'),401;
                    else:
                        return jsonify('Não encontrado'), 401;
                else:
                    return jsonify('Não Autorizado'),401;
            else:
                return jsonify("O campo password não pode ser vazio"),404;
        else:
            return jsonify("O campo email não pode ser vazio!"), 404;
    except Exception as ex:
        return jsonify(ex), 500;
