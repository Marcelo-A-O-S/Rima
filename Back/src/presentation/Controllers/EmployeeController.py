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

@employeeController.route('/employee/register', methods= ['POST'])
async def EmployeeRegister():
    try:
        data = json.loads(request.data);
        console.log(data);
        return jsonify("teste");
    except Exception as ex:
        return jsonify(ex), 500;
