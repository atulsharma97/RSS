import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbars from '../components/Navbar'
import IndividualIntervalsExample from '../components/Slider'
import Sidebar from '../components/Sidebar'
import Home from '../components/Home'

export default function HomeScreen({ isSideBarOpen }) {
  return (
    <>
      <div className="grid-container1">
        {/* {isSideBarOpen && <Sidebar />} */}
        <Home />
      </div>
    </>
  )
}
