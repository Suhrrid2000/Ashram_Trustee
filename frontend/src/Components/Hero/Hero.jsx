//Hero jsx file

import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'
//import backgroundVideo from '../../assets/Trial_Video.mp4'
import backgroundVideo from '../../assets/Test_Video.mp4'
const Hero = ({ onExploreClick }) => {



  return (
    <div className='hero-container'>

        <video className="background-video" src={backgroundVideo} type="video/mp4" autoPlay loop muted/>

        <div className='overlay'>
            <div className='hero-text'>  
            <h1>Jay Shri Guru Maharaj Jeu Ki ... JAY</h1>
            <p>Welcome To The Official Page Of Shri Ramanuj Sitaram Math where you get to know who we are - our history, our motive, 
                what we do and a few of our services which we offer for the betterment of humanity. 
            </p>
            <button className='btn' onClick={onExploreClick}>Explore Now <img src={dark_arrow} alt="" /></button>
            </div>
        </div>
    </div>
  )
}

export default Hero