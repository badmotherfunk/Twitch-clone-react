import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Register from '../Register/Register'
import './Banner.css'

export default function Banner() {

  //Récupère le pathname et extrait l'username du streamer
  const location = useLocation()
  const username = location.pathname.slice(6)

  //Gère l'état de la modal pour le bouton s'inscrire
  const [isRegister, setIsRegister] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    setIsRegister(!isRegister)
  }

  return (
    <div>
      
      <div className="bannerContainer">
        <img alt="CoolCat" className="coolCat" src="https://static.twitchcdn.net/assets/coolcat-edacb6fbd813ce2f0272.png"/>
        {username && location.pathname.match("/live/" + username) ?
        <>
          <h3 className='bannerTitre'>Inscrivez-vous pour profiter de ce que {username} a de mieux à offrir</h3>
          <h4 className='bannerTexte'>Chattez, suivez ou abonnez-vous – Twitch vous appartient.</h4>
        </>
        :
        <>
          <h3 className='bannerTitre'>Rejoignez la communauté Twitch !</h3>
          <h4 className='bannerTexte'>Découvrez les meilleurs streams où que vous soyez.</h4>
        </>
        }
      </div>
      <form>
        <button className='bannerButton' onClick={handleRegister}>
          S'inscrire
        </button>
      </form>

      {isRegister &&
        <Register onClose={() => setIsRegister(!isRegister)}/>
      }

    </div>
  )
}
