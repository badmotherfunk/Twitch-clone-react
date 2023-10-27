import React, {useState, useEffect} from 'react'
import api from '../../api'
import './Games.css'

export default function Games() {

    const [games,setGames] = useState([])
    
    useEffect(() => {

        const fetchData = async () =>{

            const result = await api.get('https://api.twitch.tv/helix/streams')
            console.log(result)

            let dataArray = result.data.data
            let finalArray = dataArray.map(game => {
                let newUrl = game.thumbnail_url
                .replace("{width}", "350")
                .replace("{height}", "200")
            game.thumbnail_url = newUrl
            return game
            })

            setGames(finalArray)

        }
        fetchData()
        
    }, [])
    
  return (
    <div className="landingContainer">

        <div>

            <h1 className="titreGames"><span className='titreChannel'>Chaînes live </span>&nbsp;qui pourraient vous plaire</h1>

            <div className="flexAccueil">

                {games.map((game,index) => (

                    <div key={index} className="carteGames">
                        <div className="carteBackground">
                            <div className="carteContainer">
                                <p className='liveCarte'>LIVE</p>
                                <img src={game.thumbnail_url} alt="jeu profile" className="imgCarte" />
                            </div>
                        </div>

                        <div className="carteBodyGames">
                            <h5 className="titreCarteGames">{game.title}</h5>
                            <div className="utilisateurCarteGames">{game.user_name}</div>
                            <div className="jeuCarteGames">{game.game_name}</div>
                            <div className="tagsContainer">

                                {game.tags.map(tags => (
                                    <div className="tagsCartesGames">{tags}</div>
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
