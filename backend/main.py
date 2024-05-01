from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/api/data/home')
def get_all_pokemon_info():
    all_pokemon_info = []
    poke_url = "https://pokeapi.co/api/v2/pokemon/"
    poke_id = 1

    while poke_id <= 15:
        response = requests.get(poke_url + str(poke_id))
        data = response.json()

        pokemon_info = {
            "name": data["name"],
            "height": data["height"],
            "icon": data["sprites"]["front_default"],
            "abilities": [ability["ability"]["name"] for ability in data["abilities"]],
            "types": [type_data["type"]["name"] for type_data in data["types"]]
        }
        all_pokemon_info.append(pokemon_info)
        poke_id += 1
    return jsonify(all_pokemon_info)

@app.route('/api/data/pokemon', methods=["POST"])
def get_pokemon_info():
    return "aa"
    

if __name__ == "__main__":
    app.run(debug=True)
