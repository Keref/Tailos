import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"
import NoteContextProvider from "./notes/NoteContext"
import Notes from "./notes/Notes"
import ChatBox from "./llm/ChatBox"

function App() {
  const [route, setRoute] = useState("Notes")

  return (
    <NoteContextProvider>
      <div className="container mx-auto md:min h-full">
        <Navbar route={route} setRoute={setRoute} />
        <div className="h-full p-2">
          { route == "Notes" ? <Notes /> : <></> }
          { route == "Chat" ? <ChatBox /> : <></> }
        </div>
      </div>
    </NoteContextProvider>
  )
}

export default App
