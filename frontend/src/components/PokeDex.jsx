import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar';

function PokeDex() {
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
    <SearchBar/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonInfo.map((pokemon, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}
            </h2>
            <img src={pokemon.icon} alt={pokemon.name} className="w-32 h-32 mb-2" />
            <p className="text-gray-600">Height: {pokemon.height}</p>
            <p className="text-gray-600">
              Abilities: {pokemon.abilities.join(', ')}
            </p>
            <p className="text-gray-600">Types: {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokeDex;