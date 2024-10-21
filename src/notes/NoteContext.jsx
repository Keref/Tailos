import { useState, useEffect } from 'react'
import { createContext } from 'react';

export const NoteContext = createContext();

const overview = `# Introduction
    
    [Intro](tailos://intro)
    
    # **Alignment**
    
    This section includes a user's values and his communities charters, e.g. a lifestyle community's longevity blueprint.
    
    [Alignment](tailos://alignment)
    
    # **Projects**
    
    [Projects](tailos://projects)
    
    # **Logs**
    
    [Logs](tailos://logs)
    `


export default function NoteContextProvider({ children }){
  
  const getAllNotes = async () => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    if (!notes.hasOwnProperty("Overview")) {
      await setNote("Overview", overview)
      notes = await getAllNotes()
    }
    return notes
  }
  
  const getNote = async (title) => {
    const notes = JSON.parse(localStorage.getItem("notes") || "{}")
    return notes[title]
  }
  
  const setNote = async (title, content) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    console.log("notes", notes)
    notes[title] = content
    console.log(notes)
    localStorage.setItem("notes", JSON.stringify(notes))
  }
  
  const destroyNote = async (title) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    delete notes[title]
    localStorage.setItem("notes", JSON.stringify(notes))
  }

    
  return (
    <NoteContext.Provider value={{ setNote, getNote, destroyNote, getAllNotes }}>
      {children}
    </NoteContext.Provider>
  )
}