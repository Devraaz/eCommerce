import React from 'react'
import Navbar from '../Sections/Navbar'
import BannerImg from '../Components/BannerImg'
import { Helmet } from 'react-helmet';

const Men = () => {
  return (
    <>
      <Helmet>
        <title>Men | Fashion Nana</title>
      </Helmet>
      <Navbar />
      <BannerImg className="h-96" src="https://images.unsplash.com/photo-1571153041701-728931a0ff63?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </>
  )
}

export default Men