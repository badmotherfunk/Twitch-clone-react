import React from 'react'
import { useState } from 'react'
import logo from '../Header/IconeTwitch.svg'
import cross from '../Header/cross-close.svg'
import './Banner.css'

export default function Banner() {

  const [isRegister, setIsRegister] = useState(false)


  const handleRegister = (e) => {
    e.preventDefault()
    setIsRegister(true)
  }
  return (
    <div>

        <div className="bannerContainer">
        <img alt="CoolCat" className="coolCat" src="https://static.twitchcdn.net/assets/coolcat-edacb6fbd813ce2f0272.png"/>
            <h3 className='bannerTitre'>Rejoignez la communauté Twitch !</h3>
            <h4 className='bannerTexte'>Découvrez les meilleurs streams où que vous soyez.</h4>
        </div>
        <form className="formLogin bannerButton">
                <button onClick={handleRegister}>
                    S'inscrire
                </button>
        </form>

        {isRegister &&
        <div className='modal-container'>
          <div className="modal-layout" onClick={() => setIsRegister(false)}></div>
            <div className="modal-login-container">

                <div className="modal">
                    <img src={cross} alt="cross close" onClick={() => setIsRegister(false)} className='cross-close-modal' />
                    
                    <div className='modal-title-container'>
                        <img src={logo} alt="logo twitch" className='twitch-logo'/>
                        <h1 className='modal-title'>Rejoignez Twitch aujourd'hui</h1>
                    </div>

                    <div className='modal-text'>
                        <p>Créer un compte vous permet de participer dans le chat, de suivre vos chaînes préférées et de diffuser sur votre propre chaîne.</p>
                    </div>

                    <div className="form-modal-container">
                        <label htmlFor="email">Identifiant</label>
                        <input type="text" />

                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" />
                            
                        <p className='register-step'>Etape 1 sur 3</p>
                        <div className='next-step-container'>                            <button className="modal-button register-button">Prochaine étape</button>
                        </div>
                    </div>
                </div>
          </div>

            
        </div>
        }


    </div>
  )
}
