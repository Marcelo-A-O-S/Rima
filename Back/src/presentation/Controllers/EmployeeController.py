from flask import request, jsonify, Blueprint;
import json

employeeController = Blueprint('EmployeeController',__name__);


@employeeController.route('/employee')
async def GetAll():
    return

@employeeController.route('/employee/create', methods=['POST'])
async def Create():
    return

@employeeController.route('/employee/delete', methods = ['POST'])
async def Delete():
    return
