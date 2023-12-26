import React, {useState, useEffect} from 'react'
import api from '../../api'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../Context/Theme'
import defaultPicture from '../Games/default-picture.png'

export default function Sidebar() {

  const [{theme, isDark}] = useContext(ThemeContext)

  const [topStreams, setTopStreams] = useState([])

  const [active, setActive] = useState(false)

  const toggleSidebar = () => {
    setActive(!active)
  }

  useEffect(() => {

    const fetchData = async () => {

      const result = await api.get('https://api.twitch.tv/helix/streams')

      let dataArray = result.data.data

      let gameIDs = dataArray.map(stream => {
        return stream.game_id
      })
      let userIDs = dataArray.map(stream => {
        return stream.user_id
      })

      // Création des URLs personnalisés
      let baseUrlGames = 'https://api.twitch.tv/helix/games?'
      let baseUrlUsers = 'https://api.twitch.tv/helix/users?'

      let queryParamsGame = ""
      let queryParamsUsers = ""

      gameIDs.map(id => {
        return (queryParamsGame = queryParamsGame + `id=${id}&`)
      })
      userIDs.map(id => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
      })

      //url final 
      let urlFinalGames = baseUrlGames + queryParamsGame
      let urlFinalUsers = baseUrlUsers + queryParamsUsers

      // Appel
      let gamesNames = await api.get(urlFinalGames)
      let getUsers = await api.get(urlFinalUsers)

      let gamesNameArray = gamesNames.data.data
      let arrayUsers = getUsers.data.data

      //Création du tableau final
      let finalArray = dataArray.map(stream => {

        //Changer l'affichage des viewers en "K"
        let newViewers = stream.viewer_count
        if (newViewers < 1000) {
          stream.viewer_count = newViewers;
        } else if (newViewers >= 1000 && newViewers < 1_000_000) {
          stream.viewer_count = (newViewers / 1000).toFixed(1) + " k";
        }

        //Ajout des nouvelles propriétés
        stream.gameName = ""
        stream.truePic = ""
        stream.login = ""

        gamesNameArray.forEach(name => {
          arrayUsers.forEach(user => {
              if(stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url
              stream.gameName = name.name 
              stream.login = user.login
            }
          })
        })       
        return stream
          
      })
      setTopStreams(finalArray.slice(0,10))
    }
    fetchData()

  }, [])


  return (
    <div className={active ? 'sidebarActive' : 'sidebar'} style={{backgroundColor: theme.sidebarLayout.backgroundColor, color: theme.sidebarLayout.color}}>

      <div className='sidebarStickyContainer'>

        <div className="containerTitre">
          <h2 className={active ? 'titreSidebarActive' : 'titreSidebar'}  style={{color: theme.sidebarLayout.color}}>CHAÎNES RECOMMANDÉES</h2>
          
          {!active ? 
          <button className={isDark ? 'darkToggleSidebar' : 'toggleSidebar'} 
          onClick={toggleSidebar} 
          data-text="Masquer"
          >
            {isDark ?
              <svg width="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false" fill='#FFFFFF' ><g><path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path></g></svg>
            :
              <svg width="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false" ><g><path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path></g></svg>
            }
          </button>
          : 
          <div className='sidebarIcons'>
            <button className={isDark ? 'darkToggleSidebarActive' : 'toggleSidebarActive'}  
            onClick={toggleSidebar} 
            data-text="Développer"
            >
              {isDark ?
                <svg width="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false" fill='#FFFFFF' ><g><path d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path></g></svg>
              :
                <svg width="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" aria-hidden="true" focusable="false" ><g><path d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path></g></svg>
              }
            </button>
            <button className='toggleSidebarActive' 
            data-text="Chaînes recommandées"
            style={{backgroundColor: theme.sidebarLayout.backgroundColor}}
            >
              {isDark ?
                <svg width="20px" height="2rem" viewBox="0 0 20 20"><path fill="darkGrey" fillRule="evenodd" d="M12.002 3.999a2 2 0 0 1 2 2v2L18 6v8l-3.998-2v2a2 2 0 0 1-2 1.999h-8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8zM12 6H4v8h8V6z" clipRule="evenodd"></path></svg>
              :
                <svg width="20px" height="2rem" viewBox="0 0 20 20"><path fill="rgb(83 83 95)" fillRule="evenodd" d="M12.002 3.999a2 2 0 0 1 2 2v2L18 6v8l-3.998-2v2a2 2 0 0 1-2 1.999h-8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8zM12 6H4v8h8V6z" clipRule="evenodd"></path></svg>
              }
            </button>
          </div>
          }

        </div>
        <ul className="listeStream" >

          {topStreams.map((stream, index) => (
            <Link key={index} to={{pathname: `/live/${stream.user_login}`}} state={{name: stream.user_login}}>

              <li className={active ? "containerFlexSidebarActive" : "containerFlexSidebar"}
              data-text= { `${stream.user_name} • ${stream.gameName} \n ${stream.title} \n🔴 Live | ${stream.viewer_count} spectateurs` }
              data= {stream.title}
              >
                {stream.truePic ?
                  <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
                : 
                  <img src={defaultPicture} alt="logo user" className="profilePicRonde"/> 
                }
              
                <div className={active ? "streamUserActive" : "streamUser"} style={{color: theme.sidebarLayout.color}}>{stream.user_name}</div>

                <div className={active ? "viewerRightActive" : "viewerRight"} style={{color: theme.text.color}}>
                  <div className="redDot"></div>
                  <div>{stream.viewer_count}</div>
                </div>

                <div className={active ? "gameNameSidebarActive" : "gameNameSidebar"} style={{color: theme.text.color}}>{stream.gameName}</div>

              </li>
            </Link>
            ))}
            
        </ul>

      </div>

    </div>
  )
}
