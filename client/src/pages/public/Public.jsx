import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Navigation, TopHeader } from '../../components'


function Public() {
  return (
    <div >
        <TopHeader/>
        <Header/>
        <Navigation/>
        <div className="w-full">
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Public
