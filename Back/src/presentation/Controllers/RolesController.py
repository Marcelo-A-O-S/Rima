from flask import Blueprint, request, jsonify;
import json;
from domain.Entities.Roles import Roles;
from services.RolesServices import RolesServices;

rolesController = Blueprint('RolesController',__name__);


@rolesController.route('/roles')
async def GetAll():
    try:
        services = RolesServices();
        listRoles = await services.GetAll();
        return json.dumps([role.__dict__ for role in listRoles])
    except Exception as ex:
        return jsonify(ex), 500;

@rolesController.route('/roles/create', methods = ['POST'])
async def Create():
    try:
        data = json.loads(request.data);
        if data['roleName'] != "":
                if data['typeid'] != "":
                    services = RolesServices();
                    role = Roles(0, data['roleName'], data['typeid']);
                    exists = await services.CheckExistsRole(role);
                    if exists != False:
                        res = await services.Save(role);
                        return jsonify(res);
                    else:
                        return jsonify("Registro não encontrado no banco de dados!"), 404;
                else:
                    return jsonify("Não é possivel prosseguir sem a identificação do Tipo de Função!"), 404;
        else:
            return jsonify("Não é possivel prosseguir com um nome de função vazio!"), 404;
    except Exception as ex:
        return jsonify(ex), 500;

@rolesController.route('/roles/delete', methods = ['POST'])
async def Delete():
    try:
        data = json.loads(request.data);
        if data['id'] != "":
            if data['roleName'] != "":
                if data['typeid'] != "":
                    services = RolesServices();
                    role = Roles(data['id'], data['roleName'], data['typeid']);
                    exists = await services.CheckExistsRole(role);
                    if exists != False:
                        await services.Delete(role.id);
                    else:
                        return jsonify("Não foi encontrado o registro no banco de dados!"), 404;
                else:
                    return jsonify("Não é possivel prosseguir sem a identificação do Tipo de Função!"), 404;
            else:
                return jsonify("Não é possivel prosseguir com um nome de função vazio!"), 404;
        else:
            return jsonify("Não é possivel prosseguir sem identificação"), 404;

    except Exception as ex:
        return jsonify(ex), 500;

async def Update():
    return

async def GetById():
    return
