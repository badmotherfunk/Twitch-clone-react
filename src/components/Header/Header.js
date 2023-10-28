import React from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import crown from './Crown.svg'
import './Header.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Header() {

    const { pathname } = useLocation();

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

                        <input type="text" className="inputRecherche" placeholder='Rechercher'/>
                        <button type='submit'>
                            <img src={search} alt="icone loupe" className="logoLoupe" />
                        </button>

                    </form>
                </li>

                <li className="liensNav">
                    <img src={crown} alt="logo couronne" className="logoUser" />
                </li>
            
                <li className="liensNav">
                    <form className="formLogin">
                        <button>
                            Se connecter
                        </button>
                    </form>
                </li>
                <li className="liensNav">
                    <form className="formRegister">
                        <button>
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

    </div>
  )
}
