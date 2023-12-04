import React, {useState, useEffect} from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import Carousel from '../Carousel/Carousel'
import './Games.css'

export default function Games() {

    const [games, setGames] = useState([])
    
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

            //Redimensionner les images
            let newUrl = stream.thumbnail_url
            .replace("{width}", "350")
            .replace("{height}", "200")
            stream.thumbnail_url = newUrl
        
    
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
    
          setGames(finalArray)
        }
        fetchData()
    
      }, [])


  return (
    <div className="landingContainer">

           
            { games ? <Carousel games={games}/> : null}
            
            <div className="flexAccueil">
            <div className="gamesTitleContainer">
              <h1 className="gamesTitle"><span className='titreChannel'>Chaînes live </span>&nbsp;qui pourraient vous plaire</h1>
            </div>

            <div className="streamContainer">
                {games.map((game,index) => (


                  
                    <div key={index} className="carteGames">
                        <div className="carteBackground">

                            <Link className="lien" to={{pathname: `/live/${game.user_login}`}}>
                            <div className="carteContainer">
                                <p className='liveCarte'>LIVE</p>
                                <img src={game.thumbnail_url} alt="jeu profile" className="imgCarte" />
                                <div className="viewers">
                                    <p>{game.viewer_count} spectateurs</p>
                                </div>
                            </div>
                            </Link>

                        </div>

                        <div className="carteBodyGames">

                            <div className='userStreamContainer'>
                                <Link to={{pathname: `/live/${game.user_login}`}}>
                                    <img src={game.truePic} alt="User logo" className='userLogos' />
                                </Link>

                                <div className="userStreamInfos">
                                    <Link className="titleLink" to={{pathname: `/live/${game.user_login}`}}>
                                        <h5 className="titreCarteGames" aria-label={game.title}>{game.title}</h5>
                                    </Link>
                                    <div className="utilisateurCarteGames" aria-label={game.user_name}>{game.user_name}</div>
                                    <div className="jeuCarteGames">{game.game_name}</div>

                                    
                                    <div className="tagsContainer">

                                        {game.tags && game.tags.slice(0, 4).map((tags, index) => (
                                            <div key={index} className="tagsCartesGames">{tags}</div>
                                        ))}

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                ))}
                </div>

            </div>



        <div>


        </div>

    </div>
  )
}
