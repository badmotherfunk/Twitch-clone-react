import React from 'react'
import logo from '../Header/IconeTwitch.svg'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../Context/Theme'
import Register from '../Register/Register'
import './Login.css'


export default function Login(props) {

    const [{isDark}] = useContext(ThemeContext)

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
        
                    <div className={isDark ? "darkModal" : "modal"}>
                        {isDark ?
                            <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true" onClick={() => onClose(false)} className='cross-close-modal' fill='#FFFFFF' ><path d="M8.5 10 4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path></svg>

                        :
                            <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true" onClick={() => onClose(false)} className='cross-close-modal' ><path d="M8.5 10 4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path></svg>                      
                        }
        
                        <div className='modal-title-container'>
                            <img src={logo} alt="logo twitch" className='twitch-logo'/>
                            <h1 className='modal-title'>Se connecter à Twitch</h1>
                        </div>
        
                        <div className="form-modal-container">
                            <label htmlFor="email">Identifiant</label>
                            <input type="text" className={isDark && "darkInput"}/>
        
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" className={isDark && "darkInput"}/>
        
                            <Link className={isDark ? 'dark-conexion-issue' : 'conexion-issue'} >
                                Problème de connexion ?
                            </Link>
                                <button className={isDark ? "dark-modal-button" : "modal-button"}>Se connecter</button>
                            <Link className={isDark ? "dark-register-link" : "register-link"} 
                            onClick={handleRegister} 
                            >
                                Pas de compte ? Inscrivez-vous
                            </Link>
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
