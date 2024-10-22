import { useState, useContext, useEffect } from "react"
import { NoteContext } from "./NoteContext"
import NotesSidebar from "./NotesSidebar"
import NotesOverview from "./NotesOverview"
import NoteEditor from "./NoteEditor"

export default function Notes(){
  const [activeNote, setActiveNote] = useState("")
  const [notes, setNotes] = useState({})
  const { getAllNotes, getNote, setNote, destroyNote, helia } = useContext(NoteContext)
  
  const saveNote = async (title, content) => {
    await setNote(title, content)
    let notes = await getAllNotes()
    setNotes(notes)
  }
  
  const deleteNote = async (title, content) => {
    await destroyNote(title)
    let notes = await getAllNotes()
    setNotes(notes)
    setActiveNote("Overview")
  }
  
  useEffect(() => {
    const notes = getAllNotes()
    setNotes(notes ?? {})
  }, [])
  
  return (<div className="flex  min-h-96">
    <NotesSidebar notes={notes} setActiveNote={setActiveNote} saveNote={saveNote} />
    <div className="w-full">
    {
      activeNote == "" ?
        <NotesOverview notes={notes} setActiveNote={setActiveNote} />
        : <NoteEditor title={activeNote} content={notes[activeNote]} saveNote={saveNote} destroyNote={deleteNote} helia={helia} />
    }
    </div>
  </div>)
}