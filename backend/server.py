from flask import Flask, Response, request
import json
from flask_cors import CORS
from database_methods import main_db

app = Flask(__name__)
CORS(app)


@app.route('/')
def pokemon_update_types():
    return Response(json.dumps("Hello word!!"))


@app.route('/user/<id>/')
def get_profile(id):
    user = main_db('get_user', id)
    if not user:
        return Response(json.dumps({'Success': 'user not found'}))
    return Response(json.dumps(user))


@app.route('/user/<id>/<status>/', methods=["PUT"])
def update_status(id, status):
    print(id, status)
    response = main_db('change_status', id, status)
    if response and 'error' in response:
        return Response(json.dumps({'Error': response['details']})), response['error']
    return Response(json.dumps({"Success": 'status updated successfully'}))


port_number = 3001
if __name__ == '__main__':
    app.run(port=port_number)
