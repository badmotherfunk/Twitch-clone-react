import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { ThemeContext } from '../../Context/Theme';
import api from '../../api';
import './Browse.css'
import { Link } from 'react-router-dom';

export default function Browse() {

    const [{isDark}] = useContext(ThemeContext)

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

                    <Link to={{ pathname: "/"}}>
                        <div className="gamesTags">
                            <p>Jeux</p>
                            <img alt="Icône jeux" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/gaming.svg"></img>
                        </div>
                    </Link>
                    <Link to={{ pathname: "/directory/game/Music"}}
                        state= {{
                            gameID: 509658,
                            cover: "https://static-cdn.jtvnw.net/ttv-boxart/509658-250x350.jpg",
                            name:  "Just Chatting"
                        }}>
                        <div className="IrlTags">
                            <p>IRL</p>
                            <img alt="Icône IRL" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/irl.svg"></img>
                        </div>
                    </ Link>
                    <Link to={{ pathname: "/directory/game/Music"}}
                        state= {{
                            gameID: 26936,
                            cover: "https://static-cdn.jtvnw.net/ttv-boxart/26936-250x350.jpg",
                            name:  "Music"
                        }}>
                        <div className="musicTags">
                            <p>Musique</p>
                            <img alt="Icône musique" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/music.svg"></img>
                        </div>
                    </ Link>
                    <Link to={{ pathname: "/directory"}}>
                        <div className="esportsTags">
                            <p>Esports</p>
                            <img alt="Icône esport" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/esports.svg"></img>
                        </div>
                    </Link>
                    <Link to={{ pathname: "/directory/game/Art"}}
                        state= {{
                            gameID: 509660,
                            cover: "https://static-cdn.jtvnw.net/ttv-boxart/509660-250x350.jpg",
                            name:  "Art"
                        }}>
                        <div className="creatifTags">
                            <p>Créatif</p>
                            <img alt="Icône créative" sizes="65px" src="https://static-cdn.jtvnw.net/c3-vg/verticals/creative.svg"></img>
                        </div>
                    </Link>
                
                </div>

                <div className="filterSection">
                    <h3 className={isDark ? 'darkTitleCategory' : 'titleCategory'}>Catégories</h3>
                </div>

            </div>
            <div className="flexCategory">

                {categories.map((category, index) =>(
                
                    <div key={index} className="carteCatgeory">
                        <div className="categoryBackground">

                            <Link to={ "/directory/game/" + category.name} 
                                state= {{
                                    gameID: category.id,
                                    cover: category.box_art_url,
                                    name:  category.name
                                }}
                                className='lien'>

                                <div className="carteCategoryContainer">
                                    <img src={category.box_art_url} alt="category" className="imgCategory" />

                                    {category.igdb_id > 203610 && category.id > 1910103690 &&
                                    <div className='newCategorieGame'>NOUVEAU</div>
                                }
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
