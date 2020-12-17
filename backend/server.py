from flask import Flask, Response, request
import json
from flask_cors import CORS
from database_methods import main_db

app = Flask(__name__, static_url_path='', static_folder='pictures')
CORS(app)


@app.route('/')
def pokemon_update_types():
    return Response(json.dumps("Hello word!!"))


@app.route('/user/<id>/')
def get_profile(id):
    user = main_db('get_user', id)
    print("USER", user)
    if not user:
        return Response(json.dumps({'Success': 'user not found'}))
    dog = main_db('get_dogs', id)
    if 'error' in dog:
        return Response(json.dumps({'Error': dog['details']})), dog['error']
    user['dog'] = dog
    return Response(json.dumps(user))


@app.route('/user/<id>/<status>/', methods=["PUT"])
def update_status(id, status):
    print(id, status)
    response = main_db('change_status', id, status)
    if response and 'error' in response:
        return Response(json.dumps({'Error': response['details']})), response['error']
    return Response(json.dumps({"Success": 'status updated successfully'}))


@app.route('/img/<img_url>/')
def get_img(img_url):
    return app.send_static_file(img_url)


@app.route('/requests/<id>/')
def get_requests(id):
    response = main_db('get_requests', id)
    if response and 'error' in response:
        return Response(json.dumps({'Error': response['details']})), response['error']
    return Response(json.dumps(response))


@app.route('/requests/<id>/', methods=["PUT"])
def update_request(id):
    params = request.get_json()
    print(id, params)
    response = main_db('update_request', id, params.get('sender_id'), params.get('response'))
    print(response)
    if response and 'error' in response:
        return Response(json.dumps({'Error': response['details']})), response['error']
    return Response(json.dumps({"Success": "Updated Successfully"}))


@app.route('/user/<id>/match/')
def get_matches(id):
    id = int(id)
    response = main_db('find_match', id)
    if response and 'error' in response:
        return Response(json.dumps({'Error': response['details']})), response['error']
    return Response(json.dumps(response))


port_number = 3001
if __name__ == '__main__':
    app.run(port=port_number)
