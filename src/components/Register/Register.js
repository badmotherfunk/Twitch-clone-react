import React from 'react'
import logo from '../Header/IconeTwitch.svg'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../Context/Theme'
import Login from '../Login/Login'
import '../Login/Login.css'

export default function Register(props) {

    const [{isDark}] = useContext(ThemeContext)

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

            <div className={isDark ? "darkModal" : "modal"}>
                {isDark ?
                    <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true" onClick={() => onClose(false)} className='cross-close-modal' fill='#FFFFFF' ><path d="M8.5 10 4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path></svg>
                :
                    <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true" onClick={() => onClose(false)} className='cross-close-modal' ><path d="M8.5 10 4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path></svg>                      
                }            
                <div className='modal-title-container'>
                    <img src={logo} alt="logo twitch" className='twitch-logo'/>
                    <h1 className='modal-title'>Rejoignez Twitch aujourd'hui</h1>
                </div>

                <div className={isDark ? "dark-modal-text" : "modal-text"}>
                    <p>Créer un compte vous permet de participer dans le chat, de suivre vos chaînes préférées et de diffuser sur votre propre chaîne.</p>
                </div>

                <div className="form-modal-container">
                    <label htmlFor="email">Identifiant</label>
                    <input type="text" className={isDark ? "darkInput" : "inputText"}/>

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className={isDark ? "darkInput" : "inputText"}/>
                    
                    <p className='register-step'>Etape 1 sur 3</p>
                    <div className='next-step-container'>
                        <Link className={isDark ? "dark-register-link" : "register-link"} 
                        onClick={handleRegister} 
                        >
                            Vous utilisez déjà Twitch ? Connexion
                        </Link>
                        <button className={isDark ? "dark-modal-button" : "modal-button"}>
                            Prochaine étape
                        </button>
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
