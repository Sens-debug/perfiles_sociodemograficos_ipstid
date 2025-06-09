from flask import Flask, request, jsonify
import os
from flask_cors import  CORS

app = Flask(__name__)
CORS(app)

@app.route("/confirmar_login")
def confirmar_login():
    pass
