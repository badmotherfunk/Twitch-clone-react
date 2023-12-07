import React from 'react'
import cross from '../Header/cross-close.svg'
import logo from '../Header/IconeTwitch.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Register from '../Register/Register'
import './Login.css'


export default function Login(props) {

    const [isRegister, setIsRegister] = useState(false)

    const {onClose} = props

    const handleRegister = (e) => {
        e.preventDefault()
        setIsRegister(!isRegister)
    }


  return (
    <>
        {!isRegister ?
            <div className='modal-container'>
                <div className="modal-layout" onClick={() => onClose(false)}></div>
                <div className="modal-login-container">
        
                    <div className="modal">
                        <img src={cross} alt="cross close" onClick={() => onClose(false)} className='cross-close-modal' />
        
                        <div className='modal-title-container'>
                            <img src={logo} alt="logo twitch" className='twitch-logo'/>
                            <h1 className='modal-title'>Se connecter à Twitch</h1>
                        </div>
        
                        <div className="form-modal-container">
                            <label htmlFor="email">Identifiant</label>
                            <input type="text" />
        
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" />
        
                            <Link className='conexion-issue'>Problème de connexion ?</Link>
                                <button className="modal-button">Se connecter</button>
                            <Link className="register-link" onClick={handleRegister}>Pas de compte ? Inscrivez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        :
        <Register onClose={() => onClose(!isRegister)}/>
        }
    </>
  )
}
