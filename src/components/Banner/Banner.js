import React from 'react'
import './Banner.css'

export default function Banner() {
  return (
    <div>

        <div className="bannerContainer">
        <img alt="CoolCat" className="coolCat" src="https://static.twitchcdn.net/assets/coolcat-edacb6fbd813ce2f0272.png"/>
            <h3 className='bannerTitre'>Rejoignez la communauté Twitch !</h3>
            <h4 className='bannerTexte'>Découvrez les meilleurs streams où que vous soyez.</h4>
        </div>
        <form className="formLogin bannerButton">
                <button>
                    S'inscrire
                </button>
        </form>


    </div>
  )
}
