import React from 'react';
import { Link } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import './CharacterList.css';



export default function CharactersList() {

    const {error, loading, data } = useCharacters();

    if(loading) return <div>Ładowanie...</div>;

    if(error) return <div>Błąd ładowania danych</div>;

    return (
        <div className='CharacterList'>
            {data.characters.results.map((character) => {
                return (
                    <Link to={`/${character.id}`}>
                        <img src={character.image} alt="" />
                        <h2>{character.name}</h2>
                    </Link>
                );
            })}
        </div>
  )
}
