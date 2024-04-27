import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchBar() {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/data/home");
            setPokemonInfo(response.data);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    }

    useEffect(() => {
        fetchAPI();
    }, []);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    function handleNewData(value){
        setSearchInput(value);
    }

    useEffect(() => {
        const filtered = pokemonInfo.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPokemon(filtered.slice(0, 5));
    }, [searchInput, pokemonInfo]);

    return (
        <div className="p-4">
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {searchInput && (
                <table className="mt-4 w-full border-collapse border border-gray-300">
                    <tbody>
                        {filteredPokemon.map((pokemon, index) => (
                            <tr key={index} value={pokemon.name} className="border-b border-gray-300">
                                <td className="py-2 px-4"><button onClick={handleChange} value={pokemon.name}>{pokemon.name}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchBar;


