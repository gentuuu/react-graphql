import React from 'react'
import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client'

const GET_CHARACTER_LOCATIONS = gql`
    query GetCharacterLocations($name: String!){
        characters(filter: {
            name: $name
        }) {
        results{
            location{
                name
            }
        } 
        }
    }
`

export default function Search() {

    const [name, setName] = useState("")

    const [getLocations, {loading, data, error, called}] = useLazyQuery(GET_CHARACTER_LOCATIONS, {
        variables:{
            name,
        }
    })

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value) }/>
            <button onClick={() => getLocations()}>Szukaj</button>
            {loading && <div>Ładowanie...</div>}
            {error && <div>Błąd</div>}
            {data && (
                <ul>
                    {data.characters.results.map((character) => {
                        return <li>{character.location.name}</li>
                    })}
                </ul>
            )}
        </div>
    )
}
