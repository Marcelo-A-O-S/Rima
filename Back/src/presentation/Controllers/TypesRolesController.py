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
    try:
        data = json.loads(request.data);
        if data['id'] != "":
            if data['typeName'] != "":
                services = typesRolesServices();
                exists = await services.VerifyTypeRoleNameExists(data['typeName']);
                if exists != False:
                    typerole = await services.GetTypeRoleByTypeName(data['typeName']);
                    if typerole.id == data['id']:
                        res = await services.Delete(typerole.id);
                        return jsonify(res);
                    else:
                        return jsonify("Nenhum registro encontrado, corrija os valores e tente novamente!"), 404;
                else:
                    return jsonify("Nenhum registro encontrado, corrija os valores e tente novamente!"), 404;
            else:
                return jsonify("Não é possivel prosseguir como Tipo de função vazia"), 404;
        else:
            return jsonify("Não é possivel prosseguir com a identificação vazia"), 404;
    except Exception as ex:
        return jsonify(ex), 500;

@typesRolesController.route('/typesroles/getbytypeName', methods= ['POST'])
async def GetBytypeName():
    try:
        data = json.loads(request.data);
        if data['typeName'] != "":
            services = typesRolesServices();
            typerole = await services.GetTypeRoleByTypeName(data['typeName']);
            if typerole != None:
                return jsonify(typerole.__dict__);
            return jsonify("Nada Encontrado"), 404;
        return jsonify("Não é possivel fazer a procura de um dado vazio!"), 404;
    except Exception as ex:
        print(ex)
        return jsonify(ex), 500;
@typesRolesController.route('/typesroles/deletebytypeName', methods = ['POST'])
async def DeleteByTypeName():
    try:
        data = json.loads(request.data);
        if data['typeName'] != "":
            services = typesRolesServices();
            typerole = await services.GetTypeRoleByTypeName(data['typeName']);
            if typerole != None:
                res = await services.Delete(typerole);
                return jsonify(res);
            return jsonify("Tipo de função não encontrado"), 404;
        return jsonify("Não é possivel prosseguir com o campo do tipo de função vazio"), 404;
    except Exception as ex:
        return jsonify(ex), 500;
@typesRolesController.route('/typesroles/deletebyid', methods = ['GET'])
async def DeleteById():
    try:
        data = json.loads(request.data);
        if data['id'] != "":
            services = typesRolesServices();
            result = await services.VerifyTypeRoleExistsById(data['id']);
            if result != False:
                res = await services.Delete(data['id']);
                return jsonify(res);
            else:
                return jsonify("Não existe nenhum dado relacionado a identificação!"), 404;

        else:
            return jsonify("Não é possivel prosseguir com um id vazio!"), 404;
    except Exception as ex:
        return jsonify(ex), 500;

@typesRolesController.route('/typesroles/getByid', methods = ['POST'])
async def GetById():
    try:
        data = json.loads(request.data);
        if data['id'] != "":
            services = typesRolesServices();
            typerole = await services.GetById(data['id']);
            return jsonify(typerole.__dict__);
        else:
            return jsonify("Não é possivel prosseguir com um valor vazio!"), 404;
    except Exception as ex:
        return jsonify(ex), 500;

async def Update():
    return
@typesRolesController.route('/typesroles/teste')
async def Teste():
    services = typesRolesServices();
    typerole = typesRoles(0,'Operacional');
    exists = await services.CheckPropertyTypeRoleExists(typerole);
    return jsonify(exists);
