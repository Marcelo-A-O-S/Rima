from flask import  Blueprint, jsonify
import json

authenticationController = Blueprint('AuthenticationController',__name__);


@authenticationController.route('/auth/register', methods = ["POST"])
async def Register():
    return;

@authenticationController.route('/auth/login', methods=["POST"])
async def Login():
    return;
