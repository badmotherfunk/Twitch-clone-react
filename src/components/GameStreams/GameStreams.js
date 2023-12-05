import React from 'react'
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import api from '../../api'
import heart from './heart-thin.svg'
import heartFull from './heart-icon.svg'
import './GameStreams.css'
import { Link } from 'react-router-dom'

export default function GameStreams({games}) {

    let location = useLocation()

    const [streamData, setStreamData] = useState([])
    const [viewers, setViewers] = useState(0)


    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);

            let dataArray = result.data.data;

            //Modifier la taille des images des streams récupérés
            let finalArray = dataArray.map(stream => {
                let newURL = stream.thumbnail_url
                .replace('{width}', "350")
                .replace('{height}', "200");

                stream.thumbnail_url = newURL

                return stream;
            })


            //Calcul du total des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
            return acc + val.viewer_count
            }, 0)

            //Changer l'affichage des viewers en "K"
            if (totalViewers < 1000) {
                setViewers(totalViewers)
            } else if (totalViewers >= 1000 && totalViewers < 1_000_000) {
                setViewers((totalViewers / 1000).toFixed(1) + "k");
            }

            //Récupérer les userIDs
            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            let baseUrl = "https://api.twitch.tv/helix/users?";
            let queryParamsUsers  = "";

            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })
            let finalUrl = baseUrl + queryParamsUsers

            let getUsersLogin = await api.get(finalUrl)

            let userLoginArray = getUsersLogin.data.data


            finalArray = dataArray.map(stream => {

                stream.login = ''
                stream.truePic = ''

                userLoginArray.forEach(login => {
                    if(stream.user_id === login.id) {
                        stream.login = login.login
                        stream.truePic = login.profile_image_url
                    }
                });

                //Changer l'affichage des viewers en "K"
                let newViewers = stream.viewer_count
                if (newViewers < 1000) {
                    stream.viewer_count = newViewers;
                } else if (newViewers >= 1000 && newViewers < 1_000_000) {
                    stream.viewer_count = (newViewers / 1000).toFixed(1) + " k";
                }

                return stream

            })

            setStreamData(finalArray)

        }
        fetchData()


    }, [location.state])


  return (
    
    <div className='category-container-global'>

        <div className='category-header-container'>
            <img src={location.state.cover} alt="Category thumbnail" className='category-img' />
            <div className='category-header-info'>
                <h1 className='category-title'>{location.state.name}</h1>
                <p className='category-viewers'><strong>{viewers}</strong> spectateurs</p>
                <button className='follow-button'>
                    <div className='heart-logo-container'>
                        <img className='heart-logo heart-empty' src={heart} alt="heart thin" />
                        <img className='heart-logo heart-full' src={heartFull} alt="heart full" />
                    </div>
                    <i class="fa-solid fa-heart"></i>
                    <p>Suivre</p>
                </button>
            </div>

        </div>
        <div className="filterSection">
                <h3>Chaînes Live</h3>
        </div>

        <div className="category-stream-container">
            <h3 className='category-stream-title'>Toutes les chaînes</h3>

            <div className="stream-container">

                {streamData.map((stream, index) => (
                    <div key={index} className="carteGames">
                        <div className="carteBackground">
                
                            <Link className="lien" to={{pathname: `/live/${stream.user_login}`}}>
                                <div className="carteContainer">
                                    <p className='liveCarte'>LIVE</p>
                                    <img src={stream.thumbnail_url} alt="jeu profile" className="imgCarte" />
                                    <div className="viewers">
                                        <p>{stream.viewer_count} spectateurs</p>
                                        </div>
                             </div>
                            </Link>
                
                        </div>
                
                        <div className="carteBodyGames">
                
                            <div className='userStreamContainer'>
                                <Link to={{pathname: `/live/${stream.user_login}`}}>
                                    <img src={stream.truePic} alt="User logo" className='userLogos' />
                                </Link>
                
                                <div className="userStreamInfos">
                                    <Link className="titleLink" to={{pathname: `/live/${stream.user_login}`}}>
                                        <h5 className="titreCarteGames" data-text={stream.title}>{stream.title}</h5>
                                    </Link>
                                    <div className="utilisateurCarteGames" data-text={stream.user_name}>{stream.user_name}</div>
                                    <div className="jeuCarteGames">{stream.game_name}</div>
                
                                                    
                                    <div className="tagsContainer">
                
                                        {stream.tags && stream.tags.slice(0, 4).map((tags, index) => (
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
    </div>
  )
}
