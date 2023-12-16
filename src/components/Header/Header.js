import React, { useContext, useEffect} from 'react'
import logo from './IconeTwitch.svg'
import menuIco from './MenuIco.svg'
import './Header.css'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import api from '../../api'
import { ThemeContext } from '../../Context/Theme'


export default function Header() {

    const [{theme, isDark}, toggleTheme] = useContext(ThemeContext)



    const { pathname } = useLocation();
    const navigate = useNavigate()

    const [streamer, setStreamer] = useState([])
    const [game, setGame] = useState([])
    const [error, setError] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [userActive, setUserActive] = useState(false)

    // Appel API pour récupérer les jeux en fonction du nom inscrit dans la barre de recherche
    useEffect(() => {
        if(streamer.length !== 0 ) {

            const fetchData = async () => {
                
                try {
                    const result = await api.get('https://api.twitch.tv/helix/search/categories?query=' + streamer)
                    let dataArray = result.data.data
                
                    const gameName = dataArray.map(games => {
                        let newUrl = games.box_art_url
                        .replace("52x72", "250x350")
                        games.box_art_url = newUrl
    
                        return games
                    })                
                    setGame(gameName) 
                    
                } catch (error) {
                    setError(error)
                }
                           
            }
            fetchData()
        }
    }, [streamer])

    // Si il y a du contenu d'écrit dans la barre de recherche, alors on montre le composant de suggestion
    useEffect(() => {
        if(streamer.length !== 0) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [streamer])


    
    // Accéder à la catégorie d'un jeu, où au live d'un streamer dans la barre de recherche
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const gameFiltered = game.find(games => {
            let game = games.name === streamer || streamer === games.name.toLowerCase()
    
            return game
        })

        if(streamer === gameFiltered.name) {
            navigate(`/game/${gameFiltered.name}`, { 
                state:{gameID: gameFiltered.id, cover: gameFiltered.box_art_url, name: gameFiltered.name} 
            })
        } else if (streamer){
            navigate(`/live/${streamer}`, {
                state:{name: streamer}
            })
        } else if (error) {
            navigate("/")
        }

        setStreamer([])
        setIsActive(false)
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

    // Gérer le comportement du focus sur l'input recherche
    const handleFocus = () => {
        if(streamer.length !== 0) {
            setIsActive(true)
        }
    }

    const handleCloseFocus = () => {
        setTimeout(() => {
            setIsActive(false)
        }, 125);
    }

    //Gérer les préférences utilisateurs
    const handleUserPreferences = () => {
        setUserActive(!userActive)
    }

    const handleCloseUserPreferences = () => {
        setTimeout(() => {
            setUserActive(false)
        }, 160);
    }


  return (
    <div>

        <nav className="headerTop" style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}>

            <ul className="listeMenu">

                <li className="liensNav">
                    <Link to={"/"}>
                        <img src={logo} alt="logo twitch" className="logo" />
                    </Link>
                </li>
                <li className="liensNav">
                    <Link to="/directory" >
                    <h2 className={ pathname === "/" ? "directoryButton" : "directoryButton active"} style={{color: theme.link.color, borderBottom: theme.link.borderBottom}}>Parcourir</h2>
                    </Link>
                </li>
                <li className="liensNav">
                    <form className={!isActive ? "formSubmit" : "formSubmitActive"} style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}>
                        <div className={ streamer && game && streamer === game.name ? "searchContainerFocus" : "searchContainer"} style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}>


                            <div className="searchInputContainer">
                                <input type="text" 
                                className="inputRecherche" 
                                onFocus={handleFocus} 
                                onBlur={handleCloseFocus} 
                                placeholder='Rechercher' 
                                value={streamer} onChange={(e) => setStreamer(e.target.value)}
                                style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}
                                />
                                <button type='submit'
                                className={streamer.length === 0 ? "notAllowed" : "searchButton"}
                                onClick={streamer.length !== 0 ? handleSubmit : (e) => e.preventDefault()}
                                style={{backgroundColor: theme.button.backgroundColor, color: theme.button.color}}
                                >
                                    {isDark ?
                                        <svg width="22px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" data-a-selector="tw-core-button-icon" class="ScIconSVG-sc-1q25cff-1 jpczqG" fill='#FFFFFF'><g><path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd"></path></g></svg>
                                    :
                                        <svg width="22px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" data-a-selector="tw-core-button-icon" class="ScIconSVG-sc-1q25cff-1 jpczqG"><g><path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd"></path></g></svg>
                                    }
                                </button>
                            </div>


                            {isActive &&
                                <div className="searchFocus" style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}>
                                    
                                    <ul className="searchContent">
                                            
                                        { streamer && game && 
                                            game.slice(0, 5).map((games, index) => (
                                                <Link to={{pathname: `/game/${games.name}`}}
                                                state= {{
                                                    gameID: games.id,
                                                    cover: games.box_art_url,
                                                    name:  games.name
                                                }}>
                                                    <li key={index} className='searchGameInfo' style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}>
                                                        <img src={games.box_art_url} alt="Game Cover" />
                                                        <p>{games.name}</p>
                                                    </li>  
                                                </Link>
                                            ))

                                        }

                                        <li className='searchGameInfo'>
                                            {isDark ?
                                                <svg width="20px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" data-a-selector="tw-core-button-icon" class="ScIconSVG-sc-1q25cff-1 jpczqG" fill='#FFFFFF'><g><path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd"></path></g></svg>
                                            :
                                                <svg width="20px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" data-a-selector="tw-core-button-icon" class="ScIconSVG-sc-1q25cff-1 jpczqG"><g><path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd"></path></g></svg>
                                            }
                                                <p>{streamer}</p>
                                        </li>
                                                               
                                    </ul>
                                    <button 
                                    className='goToChannel' 
                                    onClick={handleSubmit}
                                    style={{backgroundColor: theme.layout.backgroundColor, color: theme.layout.color}}
                                    >
                                        Aller sur la chaîne de {streamer}
                                    </button>
                                   
                                </div>
                            }
                        </div>
                    </form>
                </li>
                
                <li className="liensNav">
                    {isDark ?  
                        <svg className={isDark ? 'darkLogoUser' : 'logoUser'} width="25px" height="100%" viewBox="0 0 20 20" focusable="false" aria-hidden="true" fill='#FFFFFF'><path fill-rule="evenodd" d="M13.798 10.456 10 6.657l-3.798 3.799L4 8.805V13h12V8.805l-2.202 1.65zM18 5v8a2 2 0 0 1-2 2H4a2.002 2.002 0 0 1-2-2V5l4 3 4-4 4 4 4-3z" clip-rule="evenodd"></path></svg>
                    :
                        <svg className={isDark ? 'darkLogoUser' : 'logoUser'} width="25px" height="100%" viewBox="0 0 20 20" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M13.798 10.456 10 6.657l-3.798 3.799L4 8.805V13h12V8.805l-2.202 1.65zM18 5v8a2 2 0 0 1-2 2H4a2.002 2.002 0 0 1-2-2V5l4 3 4-4 4 4 4-3z" clip-rule="evenodd"></path></svg>
                    }
                </li> 
            
                <li className="liensNav">
                    <form className={isDark ? "darkFormLogin" : "formLogin"}>
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
                    <button 
                    className='userButton' 
                    onClick={handleUserPreferences}
                    // onBlur={handleCloseUserPreferences}

                    >

                        {isDark ?
                            <svg className={isDark ? 'darkLogoUser' : 'logoUser'} width="20px" height="20px" fill='#FFFFFF'><g><path fillRule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd"></path></g></svg>
                        :
                            <svg className={isDark ? 'darkLogoUser' : 'logoUser'} width="20px" height="20px"><g><path fillRule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd"></path></g></svg>
                        }
                    </button>

                    {userActive && 
                        <div className={isDark ? "darkUserPreferences" : "userPreferences"} 
                        onBlur={handleCloseUserPreferences}
                        >
                            <div className="toggleTheme">

                                <div className="toggleText">
                                    {isDark ?
                                        <svg width="20px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" fill='#FFFFFF'><g><path fill-rule="evenodd" d="M8.614 2.134a8.001 8.001 0 001.388 15.879 8.003 8.003 0 007.884-6.635 6.947 6.947 0 01-2.884.62 7.004 7.004 0 01-6.388-9.864zM6.017 5.529a5.989 5.989 0 00-2.015 4.484c0 3.311 2.69 6 6 6a5.99 5.99 0 004.495-2.028 9.006 9.006 0 01-8.48-8.456z" clip-rule="evenodd"></path></g></svg>                 
                                        :
                                        <svg width="20px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"><g><path fill-rule="evenodd" d="M8.614 2.134a8.001 8.001 0 001.388 15.879 8.003 8.003 0 007.884-6.635 6.947 6.947 0 01-2.884.62 7.004 7.004 0 01-6.388-9.864zM6.017 5.529a5.989 5.989 0 00-2.015 4.484c0 3.311 2.69 6 6 6a5.99 5.99 0 004.495-2.028 9.006 9.006 0 01-8.48-8.456z" clip-rule="evenodd"></path></g></svg>
                                    }
                                    <p>Thème sombre</p>
                                </div>

                                <input 
                                className={isDark ? 'darkToggleButton' : 'toggleButton'} 
                                onClick={toggleTheme}
                                type='checkbox'
                                />
                            </div>

                            <div className={isDark ? "darkBorderPreferences" : "borderPreferences"}></div>

                            <button className={isDark ? 'darkConexionButton' : 'conexionButton'} onClick={handleLogin}>
                            {isDark ?
                                <svg width="20px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" fill='#FFFFFF'><g><path d="M16 18h-4a2 2 0 0 1-1.964-1.622L12 14.414V16h4V4h-4v1.586l-1.964-1.964A2 2 0 0 1 12 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path><path d="M7.5 6.5 9 5l5 5-5 5-1.5-1.5L10 11H2V9h8L7.5 6.5Z"></path></g></svg>
                                :
                                <svg width="20px" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px"><g><path d="M16 18h-4a2 2 0 0 1-1.964-1.622L12 14.414V16h4V4h-4v1.586l-1.964-1.964A2 2 0 0 1 12 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path><path d="M7.5 6.5 9 5l5 5-5 5-1.5-1.5L10 11H2V9h8L7.5 6.5Z"></path></g></svg>
                            }
                            <p>Se connecter</p>
                            </button>
                        </div>               
                    }
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
