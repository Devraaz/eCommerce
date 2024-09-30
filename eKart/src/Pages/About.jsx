import React from 'react'
import Navbar from '../Sections/Navbar'
import BannerImg from '../Components/BannerImg'
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
        <Helmet>
            <title>About | India's Smartest Shopping Point</title>
        </Helmet>
        <Navbar />
        <BannerImg src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/61775218f4487fe8.jpg" />
        
    </>
  )
}

export default About