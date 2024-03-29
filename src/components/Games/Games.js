import React, {useState, useEffect, useContext} from 'react'
import { ThemeContext } from '../../Context/Theme'
import api from '../../api'
import { Link } from 'react-router-dom'
import Carousel from '../Carousel/Carousel'
import './Games.css'
import defaultPicture from './default-picture.png'

export default function Games() {

  const [{isDark, theme}] = useContext(ThemeContext)

  const [games, setGames] = useState([])
    
  useEffect(() => {


    const fetchData = async () => {

      //Récupérer les images des jeux les plus populaires
      const response = await api.get('https://api.twitch.tv/helix/games/top')

      let data = response.data.data
      let finalData = data.map(game => {
        let newUrl = game.box_art_url
        .replace("{width}", "250")
        .replace("{height}", "350")
      game.box_art_url = newUrl

      return game
      })

      //Récupérer les top streams
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
        .replace("{width}", "305")
        .replace("{height}", "175")
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
            
        // Vérifie que les données des requêtes correspondent pour assigner les informations utilisateur
        gamesNameArray.forEach(name => {
          arrayUsers.forEach(user => {
            if(stream.user_id === user.id && stream.game_id === name.id) {
    
              stream.truePic = user.profile_image_url
              stream.gameName = name.name 
              stream.login = user.login
            }
          })
        })

              
        // Vérifie que les données des requêtes correspondent pour assigner l'image du jeu
        dataArray.forEach(gameName => {
            finalData.forEach(name => {
              if(gameName.gameName === name.name) {
                stream.box_art_url = name.box_art_url
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
              <h1 className={isDark ? "darkGamesTitle" : "gamesTitle"}>
                <span 
                className={isDark ? 'darkTitleChannel' : 'titleChannel'}>
                  Chaînes live 
                </span>
                &nbsp;qui pourraient vous plaire
              </h1>
            </div>

          <div className="streamContainer">
            {games.map((game,index) => (
               
              <div key={index} className="carteGames">
                <div className="carteBackground">

                  <Link className="lien" to={{pathname: `/live/${game.user_login}`}} 
                  state={{name: game.user_name}}>
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
                    <Link to={{pathname: `/live/${game.user_login}`}}
                    state={{name: game.user_name}}>
                    {game.truePic ?
                      <img src={game.truePic} alt="User logo" className='userLogos' />
                    :
                      <img src={defaultPicture} alt="default user logo" className='userLogos'/>
                    }
                    </Link>

                    <div className="userStreamInfos">
                      <Link to={{pathname: `/live/${game.user_login}`}}
                      state={{name: game.user_name}} 
                      className="titleLink" >
                      <h5 className={isDark ? "darkTitreCarteGames" : "titreCarteGames"} 
                      data-text={game.title}
                      >
                        {game.title}
                      </h5>
                      </Link>
                      <div className="utilisateurCarteGames" 
                      data-text={game.user_name}
                      style={{color: theme.text.color}}
                      >
                        {game.user_name}
                      </div>
                      <Link to={{pathname: `directory/game/${game.game_name}`}}
                        state= {{
                          gameID: game.game_id,
                          cover: game.box_art_url,
                          name:  game.game_name
                        }}
                      >
                        <div className={isDark ? "darkJeuCarteGames" : "jeuCarteGames"}>{game.game_name}</div>
                      </Link>

                                    
                      <div className="tagsContainer">

                        {game.tags && game.tags.slice(0, 4).map((tags, index) => (
                          <div 
                          key={index} 
                          className={isDark ? "darkTagsCartesGames" : "tagsCartesGames"}
                          >
                            {tags}
                          </div>
                        ))}

                      </div>
                    </div>

                  </div>

                </div>
                  
              </div>

            ))}
          </div>

        </div>
    </div>
  )
}
