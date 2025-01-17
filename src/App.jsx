import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteContextProvider from "./notes/NoteContext"
import Notes from "./notes/Notes"
import Tasks from "./notes/Tasks"
import ChatBox from "./llm/ChatBox"
import Communities from "./communities/Communities"
import CreateCommunity from "./communities/CreateCommunity"
import CommunityProfile from "./communities/CommunityProfile"
import Layout from "./components/Layout"
import NoPage from "./404"

function App() {
  return (
    <NoteContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CommunityProfile />} />
          <Route path="notes" element={<Notes />} />
          <Route path="chat" element={<ChatBox />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="communities" element={<Communities />} />
          <Route path="communities/create" element={<CreateCommunity />} />
          <Route path="communities/:communityId" element={<CommunityProfile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </NoteContextProvider>
  )
}

export default App
