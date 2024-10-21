import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import NoteContextProvider from "./notes/NoteContext"
import Notes from "./notes/Notes"

function App() {
  const [route, setRoute] = useState("Notes")

  return (
    <NoteContextProvider>
      <div className="container mx-auto md:min h-full">
        <Navbar route={route} setRoute={setRoute} />
        <div className="h-full">
          { route == "Notes" ? <Notes /> : <></> }
        </div>
      </div>
    </NoteContextProvider>
  )
}

export default App
