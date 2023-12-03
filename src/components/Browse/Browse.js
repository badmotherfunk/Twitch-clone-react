import React from 'react'
import {useState, useEffect} from 'react'
import api from '../../api';
import './Browse.css'
import { Link } from 'react-router-dom';

export default function Browse() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get('https://api.twitch.tv/helix/games/top')

            let dataArray = result.data.data
            let finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url
                .replace("{width}", "250")
                .replace("{height}", "350")
            game.box_art_url = newUrl

            return game
            })

            setCategories(finalArray)

        }
        fetchData()

    }, [])

  return (
    <div className="categoryGlobal">

        <div className="categoryContainer">
            <div className="categoryTagsContainer">
                <h2 className="sectionTitle">Parcourir</h2>

                <div className="tagsContainerCategory">

                    <div className="gamesTags">

                        <p>Jeux</p>
                        <img alt="Icône jeux" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/gaming.svg"></img>
                    </div>
                    <div className="IrlTags">
                        <p>IRL</p>
                        <img alt="Icône IRL" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/irl.svg"></img>
                    </div>
                    <div className="musicTags">
                        <p>Musique</p>
                        <img alt="Icône musique" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/music.svg"></img>
                    </div>
                    <div className="esportsTags">
                        <p>Esports</p>
                        <img alt="Icône esport" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/esports.svg"></img>
                    </div>
                    <div className="creatifTags">
                        <p>Créatif</p>
                        <img alt="Icône créative" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/creative.svg"></img>
                    </div>
                
                </div>

                <div className="filterSection">
                        <h3>Catégories</h3>
                </div>

            </div>
            <div className="flexCategory">

                {categories.map((category, index) =>(
                
                    <div key={index} className="carteCatgeory">
                        <div className="categoryBackground">

                            <Link to={ "/game/" + category.name} 
                                state= {{
                                    gameID: category.id,
                                    cover: category.box_art_url,
                                    name:  category.name
                                }}
 
                                className='lien'>
                                <div className="carteCategoryContainer">
                                    <img src={category.box_art_url} alt="category" className="imgCategory" />
                                </div>
                            </Link>

                        </div>

                        <div className="carteBodyCategory">
                            <h5 className="categoryTitle">{category.name}</h5>
                        </div>
                    </div>

                ))}

            </div>

        </div>
    </div>
  )
}
