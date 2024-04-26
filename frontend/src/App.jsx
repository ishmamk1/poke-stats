import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [pokemonInfo, setPokemonInfo] = useState([]);

  const fetchAPI = async() => {
    const response = await axios.get("http://127.0.0.1:5000/api/data/home");
    setPokemonInfo(response.data);
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <div className="pokemon-list">
        {pokemonInfo.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.icon}></img>
            <p>Height: {pokemon.height}</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <p>Types: {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;
