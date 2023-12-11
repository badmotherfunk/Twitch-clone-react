import React from 'react'
import logo from '../../components/Header/IconeTwitch.svg'
import './SearchError.css'
import { useLocation } from 'react-router-dom'

export default function SearchError() {
  const location = useLocation()
  console.log(location)
  return (
    <div className='errorContainer'>
        <img src={logo} alt="Twitch logo" />
        <h1>Aucun résultat trouvé pour {location.state.name.name}</h1>
        <p>Assurez-vous que tous les mots sont orthographiés correctement ou essayez différents mots-clés.</p>
    </div>
  )
}
