import React from 'react'
import cross from '../Header/cross-close.svg'
import logo from '../Header/IconeTwitch.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Login from '../Login/Login'
import '../Login/Login.css'

export default function Register(props) {

    const {onClose} = props
    const [isOpen, setIsOpen] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }



  return (
    <>
    {!isOpen ?
    <div className='modal-container'>
        <div className="modal-layout" onClick={() => onClose(false)}></div>
        <div className="modal-login-container">

            <div className="modal">
                <img src={cross} alt="cross close" onClick={() => onClose(false)} className='cross-close-modal' />
            
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
                    <div className='next-step-container'>
                        <Link className="register-link" onClick={handleRegister}>Vous utilisez déjà Twitch ? Connexion</Link>
                        <button className="modal-button">Prochaine étape</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    :
        <Login onClose={() => onClose(!isOpen)} />
    }
    </>
  )
}
