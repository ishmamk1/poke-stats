import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function Pokemon() {
    const location = useLocation();
    const searchInput = location.state;

    const [pokemonInfo, setPokemonInfo] = useState([]);

    useEffect(() => {
        // Call sendInfo function when component mounts
        sendInfo(searchInput)
            .then(data => {
                // Update state with received data
                setPokemonInfo(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [searchInput]);

    // Define sendInfo as a regular function
    function sendInfo(searchInput) {
        return fetch(`http://127.0.0.1:5000/api/data/pokemon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchInput)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    }



    console.log(searchInput)
    return (
        <div className='p-4'>
            <h1>{searchInput}</h1>
        </div>
    );
}

export default Pokemon;