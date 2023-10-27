import React from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import crown from './Crown.svg'
import user from './User.svg'
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
                    <img src={user} alt="logo couronne" className="logoUser" />
                </li>

            </ul>

        </nav>

        <div className="menuResBtn">
            <img src={menuIco} alt="icone menu repsonsive" className="menuIco" />
        </div>

    </div>
  )
}
