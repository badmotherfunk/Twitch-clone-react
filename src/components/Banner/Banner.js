import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Register from '../Register/Register'
import './Banner.css'

export default function Banner() {

  const [isRegister, setIsRegister] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    setIsRegister(!isRegister)
  }

  return (
    <div>
      
      <div className="bannerContainer">
        <img alt="CoolCat" className="coolCat" src="https://static.twitchcdn.net/assets/coolcat-edacb6fbd813ce2f0272.png"/>
        <h3 className='bannerTitre'>Rejoignez la communauté Twitch !</h3>
        <h4 className='bannerTexte'>Découvrez les meilleurs streams où que vous soyez.</h4>
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
