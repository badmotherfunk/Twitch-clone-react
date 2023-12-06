import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {useParams} from 'react-router-dom'
import api from '../../api'
import './Live.css'

export default function Live() {

    //Récupérer le login du streamer dans la barre de navigation
    let {slug} = useParams()


    const [infoStream, setInfoStream] = useState([])
    const [infoGame, setInfoGame] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [gameId, setGameId] = useState([])
    const [gameCover, setGameCover] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)


            let gameID = result.data.data.map(gameid => {
                return gameid.game_id
            })


            //Récupérer les info du jeu
            const resultGameName = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`)

            let gameName = resultGameName.data.data.map(gameName => {
                return gameName.name
            })

            let gamePic = resultGameName.data.data.map(gameCover => {
                let newUrl = gameCover.box_art_url
                .replace("{width}", "250")
                .replace("{height}", "350")
                gameCover.box_art_url = newUrl
                return gameCover.box_art_url
            })

            let userID = result.data.data.map(userid => {
                return userid.user_id
            })

            //Récupérer le profil utilisateur
            const profile = await api.get(`https://api.twitch.tv/helix/users?id=${userID}`)
            const userProfile = profile.data.data

            setInfoGame(gameName)
            setInfoStream(result.data.data[0])
            setUserInfo(userProfile[0])
            setGameId(gameID)
            setGameCover(gamePic)
           
        }
        fetchData()

    }, [slug, userInfo])

  return (
    <div className='containerDecale'>
        <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
        <div className="contInfo">

        <div className="userInfo">
            <div className='logoContainer'>
                <img className='userLogo' src={userInfo.profile_image_url} alt="user logo" />
            </div>
            <div className="streamInfo">
                <h2 className='userName'>{infoStream.user_name}</h2>
                <div className="streamTitle">{infoStream.title}</div>

                <div className="gameInfo">
                    <Link to={"/game/" + infoGame}
                        state= {{
                            gameID: gameId,
                            cover: gameCover,
                            name:  infoGame
                        }}
                    >
                    <p className='gameTitle'>{infoGame}</p>
                    </Link>

                    {infoStream.tags && infoStream.tags.slice(0, 5).map((tags, index) => (
                        <div key={index} className="tagsInfo">
                            <p>{tags}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>


            <div className="viewer">
                <svg width="20px" height="20px"><g><path fill='rgb(151 19 17)' fillRule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd"></path></g></svg>
                <p>{infoStream.viewer_count}</p>
            </div>

        </div>
    </div>
  )
}
