import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteContextProvider from "./notes/NoteContext"
import Notes from "./notes/Notes"
import ChatBox from "./llm/ChatBox"
import Communities from "./communities/Communities"
import Layout from "./components/Layout"
import NoPage from "./404"

function App() {
  return (
    <NoteContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Notes />} />
          <Route path="chat" element={<ChatBox />} />
          <Route path="communities" element={<Communities />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </NoteContextProvider>
  )
}

export default App
