import React, {useState, useEffect} from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { Link } from "react-router-dom";
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import './Carousel.css'
// import Fab from "@material-ui/core/Fab";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";


export default function Carousel({games}) {

  const [finalCover, setFinalCover] = useState([])

  useEffect(() => {
    
    let game = games.slice(0,10).map(game => {

      return game
  })
      setFinalCover(game)
    }, [games])


    const ref = React.useRef();
  return (
    
    <div className="carousel-container">
      {finalCover && finalCover.length ? 
        <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
          // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
          // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
          // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
            ref={carouselRef}
            slideComponent={Card}
            slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
            carouselWidth={parentWidth}
            data={finalCover}
            currentVisibleSlide={currentVisibleSlide}
            maxVisibleSlide={5}
            useGrabCursor
            />
            );
          }}
          />
        : null }

        <>
        <div
        style={{ position: "absolute", top: "40%", left: 10, zIndex: 10 }}
        size="small"
        color="primary"
        onClick={() => {
          ref.current?.goBack();
        }}
        >
        {/* <ArrowBackIcon /> */}
        </div>
        <div
        style={{ position: "absolute", top: "40%", right: 10, zIndex: 10 }}
        size="small"
        color="primary"
        onClick={() => {
          ref.current?.goNext(6);
        }}
        >
        {/* <ArrowForwardIcon /> */}
        </div>
        </>
    </div>
)};
      
// Very import to memoize your Slide component otherwise there might be performance issue
// At minimum your should do a simple React.memo(SlideComponent)
// If you want the absolute best performance then pass in a custom comparator function like below 
export const Card = React.memo(function (props) {
  
  const { data, dataIndex, slideIndex } = props;
  const {thumbnail_url, truePic, user_name, game_name, viewer_count, tags, title, user_login} = data[dataIndex];
  
  const [isActive, setIsActive] = useState()
  const [stream, setStream] = useState([])
  
  useEffect(() => {
    setIsActive(slideIndex)

    //Vérifie que la slide est bien la slide actuelle, pour correspondre à l'user_login de la slide
    if(!isActive) {
      setStream(user_login)
    }
  }, [slideIndex, isActive, user_login])
  


  return (
    <div className="card-container">
  
      {!isActive && stream.length ?

        <ReactTwitchEmbedVideo 
        height='300' 
        width="116.5%" 
        muted="true" 
        channel={stream} />

      : 

        <div
        style={{
        width: "100%",
        height: 300,
        userSelect: "none",
        }}
        className="my-slide-component"
        >

        <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: 0,
        }}
        draggable={false}
        src={thumbnail_url}
        alt="cover"
        />
        
        </div>
      }

    <div className="card-info-container" style={ !isActive ? {display: 'block'} : {display: 'none'} }>
      <div className="carousel-user-container">
        
      <Link className="lien" to={{pathname: `/live/${user_login}`}}>
        <img src={truePic} alt="User logo" className="user-carousel-logo" />
      </Link>

        <div className="carousel-user-infos">
        <Link className="lien" to={{pathname: `/live/${user_login}`}}>
          <p className="card-info-userName">{user_name}</p>
        </Link>
          <p className="card-info-gameName">{game_name}</p>
          <p className="card-info-viewerCount">{viewer_count} spectateurs</p>
        </div>

      </div>

      <div className="tags-container">
        <p className="card-info-tag">{tags[0]}</p>
        {tags[1] ? 
        <p className="card-info-tag">{tags[1]}</p>
      : null }
      </div>
      <p className="card-info-title">{title}</p>
  </div>


  </div>
  );
});