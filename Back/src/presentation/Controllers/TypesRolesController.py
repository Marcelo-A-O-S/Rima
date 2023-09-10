from flask import Blueprint, request, jsonify
import json
from services.typesRolesServices import typesRolesServices
from domain.Entities.typesRoles import typesRoles
typesRolesController = Blueprint('TypesRolesController',__name__)


@typesRolesController.route('/typesroles',methods = ['GET'])
async def GetAll():
    try:
        typeRolesServices = typesRolesServices();
        ListTypeRoles = await typeRolesServices.GetAll();
        return json.dumps(ListTypeRoles, default=lambda obj: obj.__dict__), 200;
    except Exception as ex:
        print(ex);
        return jsonify(ex), 500;

@typesRolesController.route('/typesroles/create', methods= ['POST'])
async def Create():
    try:
        data = json.loads(request.data);
        if data['typeName'] != "":
            typeRolesServices = typesRolesServices();
            typeRole = typesRoles(0, data['typeName']);
            result = await typeRolesServices.Save(typeRole);
            return jsonify(result);
        else:
            return jsonify('O tipo de função não pode ser um tipo sem definição(vazio)'), 404;
    except Exception as ex:
        return jsonify(ex), 500;

@typesRolesController.route('/typesroles/delete', methods= ['POST'])
async def Delete():
    data = json.loads(request.data);

@typesRolesController.route('/typesroles/getbytypeName', methods= ['POST'])
async def GetBytypeName():
    try:
        data = json.loads(request.data);
        if data['typeName'] != '':
            services = typesRolesServices();
            typerole = await services.GetTypeRoleByTypeName(data['typeName']);
            if typerole != None:
                return jsonify(typerole.__dict__);
            return jsonify("Nada Encontrado"), 404;
        return jsonify("Não é possivel fazer a procura de um dado vazio!"), 404;
    except Exception as ex:
        print(ex)
        return jsonify(ex), 500;

async def DeleteByTypeName():
    return

async def DeleteById():
    return

async def GetById():
    return

async def Update():
    return
