import React from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import crown from './Crown.svg'
import './Header.css'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import cross from './cross-close.svg'
// import { useEffect } from 'react'


export default function Header() {

    const { pathname } = useLocation();
    const navigate = useNavigate()

    const [streamer, setStreamer] = useState([])

    // Accéder au live d'un streamer dans la barre de recherche
    const handleSubmit = () => {
        navigate("/live/" + streamer)
    }

    // useEffect(() => {
    //     if(error) {
    //         navigate("/")
    //     }
    // }, [navigate])

    //Login modal

    const [isOpen, setIsOpen] = useState(false)
    const [isRegister, setIsRegister] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault()
        setIsOpen(true)
        setIsRegister(false)

    }

    const handleRegister = (e) => {
        e.preventDefault()
        setIsRegister(true)
        setIsOpen(false)

    }

    console.log(isOpen)



  return (
    <div>

        <nav className="headerTop">

            <ul className="listeMenu">

                <li className="liensNav">
                    <Link to={"/"}>
                        <img src={logo} alt="logo twitch" className="logo" />
                    </Link>
                </li>
                <li className="liensNav">
                    <Link to="/directory" >
                    <h2 className={ pathname === "/" ? "directoryButton" : "directoryButton active"}>Parcourir</h2>
                    </Link>
                </li>
                <li className="liensNav">
                    <form className="formSubmit">

                        <input type="text" className="inputRecherche" placeholder='Rechercher' value={streamer} onChange={(e) => setStreamer(e.target.value)}/>
                        <button type='submit' onClick={handleSubmit}>
                            <img src={search} alt="icone loupe" className="logoLoupe" />
                        </button>

                    </form>
                </li>

                <li className="liensNav">
                    <img src={crown} alt="logo couronne" className="logoUser" />
                </li>
            
                <li className="liensNav">
                    <form className="formLogin">
                        <button onClick={handleLogin}>
                            Se connecter
                        </button>
                    </form>
                </li>
                <li className="liensNav">
                    <form className="formRegister">
                        <button onClick={handleRegister}>
                            S'inscrire
                        </button>
                    </form>
                </li>


                <li className="liensNav">
                <svg className='logoUser' width="20px" height="20px"><g><path fillRule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd"></path></g></svg>
                </li>

            </ul>

        </nav>

        <div className="menuResBtn">
            <img src={menuIco} alt="icone menu repsonsive" className="menuIco" />
        </div>

        {isOpen &&
        <div className='modal-container'>
            <div className="modal-layout" onClick={() => setIsOpen(false)}></div>
            <div className="modal-login-container">

                <div className="modal">
                    <img src={cross} alt="cross close" onClick={() => setIsOpen(false)} className='cross-close-modal' />
                    
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
        }

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
                        <div className='next-step-container'>
                            <Link className="register-link" onClick={handleLogin}>Vous utilisez déjà Twitch ? Connexion</Link>
                            <button className="modal-button register-button">Prochaine étape</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
        }

    </div>
  )
}
