import { useState } from 'react'

import viteLogo from '/vite.svg'
// import './App.css'
import Video from './video.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'


export default function App() {
  return (
    <div>
      <Header/>
      <h1>VIDEO</h1>
      {/* <Video/>
      <button onClick={() => afficherVideo()}>
        VISIONNER ET JOUER 
      </button> */}
      <button>
        VISIONNER ET JOUER 
      </button>
      <Footer/>
    </div>
    
  )
}


