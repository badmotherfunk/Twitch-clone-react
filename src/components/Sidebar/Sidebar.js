import React, {useState, useEffect} from 'react'
import api from '../../api'
import './Sidebar.css'
import { Link } from 'react-router-dom'

export default function Sidebar() {

  const [topStreams, setTopStreams] = useState([])

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
        console.log(finalArray)

      setTopStreams(finalArray.slice(0,10))
    }
    fetchData()

  }, [])

  console.log(topStreams)

  return (
    <div className='sidebar'>

        <h2 className="titreSidebar">CHAÎNES RECOMMANDÉES</h2>
        <ul className="listeStream">


            {topStreams.map((stream, index) => (
              <Link key={index} to={{pathname: `/live/${stream.user_login}`}}>


              <li className="containerFlexSidebar">

                <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
              
                <div className="streamUser">{stream.user_name}</div>

                <div className="viewerRight">
                  <div className="redDot"></div>
                  <div>{stream.viewer_count}</div>
                </div>

                <div className="gameNameSidebar">{stream.gameName}</div>

              </li>
              </Link>
            ))}

            
        </ul>

    </div>
  )
}
