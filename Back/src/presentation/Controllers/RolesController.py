from flask import Blueprint, request, jsonify;
import json;


rolesController = Blueprint('RolesController',__name__);


@rolesController.route('/roles')
async def GetAll():
    return

@rolesController.route('/roles/create', methods = ['POST'])
async def Create():
    return

@rolesController.route('/roles/delete', methods = ['POST'])
async def Delete():
    return
