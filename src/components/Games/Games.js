import React, {useState, useEffect} from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import './Games.css'

export default function Games() {

    const [games,setGames] = useState([])
    
    useEffect(() => {

        const fetchData = async () =>{

            const result = await api.get('https://api.twitch.tv/helix/streams')

            let dataArray = result.data.data
            let finalArray = dataArray.map(game => {
                let newUrl = game.thumbnail_url
                .replace("{width}", "350")
                .replace("{height}", "200")
                game.thumbnail_url = newUrl
            
                let newViewers = game.viewer_count
                if (newViewers < 1000) {
                    game.viewer_count = newViewers;
                } else if (newViewers >= 1000 && newViewers < 1_000_000) {
                    game.viewer_count = (newViewers / 1000).toFixed(1) + " k";
                }
                return game
            })

            setGames(finalArray)

        }
        fetchData()
        
        
    }, [])
    console.log(games)

  return (
    <div className="landingContainer">

        <div>

            <h1 className="titreGames"><span className='titreChannel'>Chaînes live </span>&nbsp;qui pourraient vous plaire</h1>

            <div className="flexAccueil">

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
                            <h5 className="titreCarteGames">{game.title}</h5>
                            <div className="utilisateurCarteGames">{game.user_name}</div>
                            <div className="jeuCarteGames">{game.game_name}</div>
                            <div className="tagsContainer">

                                {game.tags && game.tags.slice(0, 5).map((tags, index) => (
                                    <div key={index} className="tagsCartesGames">{tags}</div>
                                ))}
                          
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
