import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function SearchBar() {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

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

    useEffect(() => {
        const filtered = pokemonInfo.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPokemon(filtered.slice(0, 5));
    }, [searchInput, pokemonInfo]);

    function printSearch() {
        console.log(searchInput);
    }

    const handleSearch = () => {
        navigate('/pokemon', { state: searchInput });
        console.log(searchInput)
    };


    return (
        <div className='p-4'>
            <div className="flex items-center">
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Old router method
            <Link to={{ pathname:"/pokemon", state: pokemonInfo}}>
            <button type="submit" onClick={handleSearch} className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.293 9.293a1 1 0 111.414-1.414L11 10.586l1.293-1.293a1 1 0 111.414 1.414L12.414 12l1.293 1.293a1 1 0 11-1.414 1.414L11 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L9.586 12 8.293 10.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">Search</span>
            </button>
            </Link>
            */}
            <button type="submit" onClick={handleSearch} className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.293 9.293a1 1 0 111.414-1.414L11 10.586l1.293-1.293a1 1 0 111.414 1.414L12.414 12l1.293 1.293a1 1 0 11-1.414 1.414L11 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L9.586 12 8.293 10.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="ml-1">Search</span>
            </button>

            </div>
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


