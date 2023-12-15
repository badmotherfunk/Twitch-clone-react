import React from 'react'
import logo from '../Header/IconeTwitch.svg'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../Context/Theme'
import Register from '../Register/Register'
import './Login.css'


export default function Login(props) {

    const [{theme, isDark}] = useContext(ThemeContext)

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
        
                    <div className="modal" style={{backgroundColor: theme.sidebarLayout.backgroundColor, color: theme.sidebarLayout.color}}>
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
                            <input type="text" style={{backgroundColor: theme.sidebarLayout.backgroundColor, color: theme.sidebarLayout.color}}/>
        
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" style={{backgroundColor: theme.sidebarLayout.backgroundColor, color: theme.sidebarLayout.color}}/>
        
                            <Link className='conexion-issue' 
                            style={{color: theme.link.color}}
                            >
                                Problème de connexion ?
                            </Link>
                                <button className="modal-button" style={{backgroundColor: theme.button.backgroundColor, color: theme.text.color}}>Se connecter</button>
                            <Link className="register-link" 
                            onClick={handleRegister} 
                            style={{color: theme.link.color}}
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
