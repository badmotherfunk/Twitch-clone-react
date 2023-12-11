import React, { useEffect } from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import crown from './Crown.svg'
import './Header.css'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import api from '../../api'


export default function Header() {

    const { pathname } = useLocation();
    const navigate = useNavigate()

    const [streamer, setStreamer] = useState([])
    const [game, setGame] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        if(streamer.length !== 0 ) {

            const fetchData = async () => {
                
                try {
                    const result = await api.get('https://api.twitch.tv/helix/search/categories?query=' + streamer)
                    let dataArray = result.data.data
                
                    const gameName = dataArray.find(games => {
                        let newUrl = games.box_art_url
                        .replace("52x72", "250x350")
                        games.box_art_url = newUrl
    
                        const game = games.name === streamer
                        return game
                    })                
                    setGame(gameName) 
                } catch (error) {
                    setError(error)
                }
                           
            }
            fetchData()
        }
    }, [streamer])

    
    // Accéder à la catégorie d'un jeu, où au live d'un streamer dans la barre de recherche
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(game !== undefined) {
            navigate(`/game/${game.name}`, { 
                state:{gameID: game.id, cover: game.box_art_url, name: game.name} 
            })
        } else if (streamer){
            navigate(`/live/${streamer}`, {
                state:{name: streamer}
        })
        } else if (error) {
            navigate('/')
        }

    }


    // Gérer l'état des modales de connexion et d'inscription
    const [isOpen, setIsOpen] = useState(false)
    const [isRegister, setIsRegister] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
        setIsRegister(false)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        setIsRegister(!isRegister)
        setIsOpen(false)
    }


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
                        <button type='submit'
                        className={streamer.length === 0 ? "notAllowed" : "searchButton"}
                        onClick={streamer.length !== 0 ? handleSubmit : (e) => e.preventDefault()}>
                            <img src={search} 
                            alt="icone loupe" 
                            className="logoLoupe"
                            />
                        </button>

                    </form>
                </li>

                <li className="liensNav">
                    <img src={crown} alt="logo couronne" className="logoUser" />
                </li> 
            
                <li className="liensNav">
                    <form className="formLogin">
                        <button className="loginButton" onClick={handleLogin}>
                            Se connecter
                        </button>
                    </form>
                </li>
                <li className="liensNav">
                    <form className="formRegister">
                        <button className="registerButton" onClick={handleRegister}>
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
            <Login onClose={() => setIsOpen(false)}/>
        }

        {isRegister &&
            <Register isRegister={isRegister} onClose={() => setIsRegister(false)}/>
        }

    </div>
  )
}
