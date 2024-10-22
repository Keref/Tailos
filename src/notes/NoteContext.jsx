import { useState, useEffect } from 'react'
import { createContext } from 'react';
import { createHelia } from 'helia';

export const NoteContext = createContext();

const overview = `## Introduction

[[Intro]]

## **Alignment**

This section includes a user's values and his communities charters, e.g. a lifestyle community's longevity blueprint.

[[Alignment]]

## **Projects**

[[Projects]]

## **Logs**

[[Logs]]
`


export default function NoteContextProvider({ children }){
  const [helia, setHelia] = useState()
  
  useEffect(()=>{
    const initHelia = async () => {
      const helia = await createHelia();
      setHelia(helia);
    };
    initHelia()
  }, [])
  
  const getAllNotes = () => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    if (!notes.hasOwnProperty("Overview")) {
      setNote("Overview", overview)
      notes = getAllNotes()
    }
    return notes
  }
  
  const getNote = (title) => {
    const notes = JSON.parse(localStorage.getItem("notes") || "{}")
    return notes[title]
  }
  
  const setNote = (title, content) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    console.log("notes", notes)
    notes[title] = content
    console.log(notes)
    localStorage.setItem("notes", JSON.stringify(notes))
  }
  
  const destroyNote = (title) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    delete notes[title]
    localStorage.setItem("notes", JSON.stringify(notes))
  }

    
  return (
    <NoteContext.Provider value={{ setNote, getNote, destroyNote, getAllNotes, helia }}>
      {children}
    </NoteContext.Provider>
  )
}