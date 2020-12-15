from flask import Flask, Response, request
import json
from flask_cors import CORS
from database_methods import main_db

app = Flask(__name__)
CORS(app)


@app.route('/')
def pokemon_update_types():
    return Response(json.dumps("Hello word!!"))


port_number = 3001
if __name__ == '__main__':
    app.run(port=port_number)
