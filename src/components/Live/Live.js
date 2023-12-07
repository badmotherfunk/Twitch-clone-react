import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {useParams} from 'react-router-dom'
import api from '../../api'
import './Live.css'
import heart from '../GameStreams/heart-thin.svg'
import heartFull from '../GameStreams/heart-icon.svg'
import Register from '../Register/Register'

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

    //Gére l'ouverture de la modale
    const [isOpen, setIsOpen] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

  return (
    <>
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

                <div className="streamInfos">
                    <div className="streamButtons">
                        <button className='reactButton' onClick={handleRegister}>
                            <svg width="20px" height="20px" viewBox="0 0 20 20" aria-hidden="true" fill='#6b2fc5'><path d="M15 7V5h-2V3h2V1h2v2h2v2h-2v2h-2Z"></path><path d="M10 2c.339 0 .672.021 1 .062v2.021A6 6 0 1 0 15.917 9h2.021A8 8 0 1 1 10 2Z"></path><path d="M12 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5 1a2 2 0 1 1-4 0h4Z"></path></svg>
                            <p>Réagir</p>
                        </button>
                        <button className='follow-button' onClick={handleRegister}>
                            <div className='heart-logo-container'>
                                <img className='heart-logo heart-empty' src={heart} alt="heart thin" />
                                <img className='heart-logo heart-full' src={heartFull} alt="heart full" />
                            </div>
                            <i class="fa-solid fa-heart"></i>
                            <p>Suivre</p>
                        </button>

                        <button className='subscribeButton' onClick={handleRegister}>
                            <div className='star-logo-container'>
                                <svg width="20px" height="20px" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M11.456 8.255 10 5.125l-1.456 3.13-3.49.485 2.552 2.516-.616 3.485L10 13.064l3.01 1.677-.616-3.485 2.553-2.516-3.491-.485zM7.19 6.424l-4.2.583c-.932.13-1.318 1.209-.664 1.853l3.128 3.083-.755 4.272c-.163.92.876 1.603 1.722 1.132L10 15.354l3.579 1.993c.846.47 1.885-.212 1.722-1.132l-.755-4.272 3.128-3.083c.654-.644.268-1.723-.664-1.853l-4.2-.583-1.754-3.77c-.406-.872-1.706-.872-2.112 0L7.19 6.424z" clip-rule="evenodd"></path></svg>
                            </div>
                            <i class="fa-solid fa-heart"></i>
                            <p>S'abonner</p>
                        </button>
                    </div>        

                    <div className="viewer">
                        <svg width="20px" height="20px"><g><path fill='rgb(151 19 17)' fillRule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clipRule="evenodd"></path></g></svg>
                        <p>{infoStream.viewer_count}</p>
                    </div>
                </div>


            </div>
        </div>
        
        {isOpen &&
            <Register onClose={() => setIsOpen(!isOpen)}/> 
        }
    </>
  )
}
