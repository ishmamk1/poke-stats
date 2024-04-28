import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import SearchBar from './components/SearchBar';
import PokeDex from './components/PokeDex';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl font-bold text-center mb-8">Pokémon List</h1>
        <Routes>
          <Route path="/" element={<PokeDex/>}></Route>
          <Route path='/pokemon' element={<Pokemon/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
