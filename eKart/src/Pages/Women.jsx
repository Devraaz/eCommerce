import React from 'react'
import Navbar from '../Sections/Navbar'
import BannerImg from '../Components/BannerImg'
import { Helmet } from 'react-helmet';

const Women = () => {
  return (
    <div>
      <Helmet>
        <title>About | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <BannerImg src="https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

    </div>
  )
}

export default Women