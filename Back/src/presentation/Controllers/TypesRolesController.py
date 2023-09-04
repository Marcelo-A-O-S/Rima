from flask import Blueprint, request, jsonify
import json
from services.typesRolesServices import typesRolesServices
from domain.Entities.typesRoles import typesRoles
typesroles_route = Blueprint('TypesRolesController',__name__)


@typesroles_route.route('/typesroles',methods = ['GET'])
async def GetAll():
    typeRolesServices = typesRolesServices();
    ListTypeRoles = await typeRolesServices.GetAll();

    return jsonify(json.dumps(ListTypeRoles, default=lambda obj: obj.__dict__)), 200;

@typesroles_route.route('/typesroles/create', methods= ['POST'])
async def Create():
    typeRolesServices = typesRolesServices();
    data = json.dumps(request.data);
    typeRole = typesRoles(0, data['typeName'])
    result = await typeRolesServices.Save(typeRole)

