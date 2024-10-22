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

  const addTask = (task) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    let tasks = notes["Tasks"] || []
    tasks.push({id: "Task_" + new Date().toISOString(), status: "pending", ...task})
    notes["Tasks"] = tasks
    localStorage.setItem("notes", JSON.stringify(notes))
  }
  
  const editTask = (id, action, msg) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}")
    let tasks = notes["Tasks"] || []
    for(let k =0; k< tasks.length; k++){
      if (tasks[k].id == id){
        if (action == "delete"){
          tasks.splice(k, 1)
          break
        } else if( action == "set_done"){
          tasks[k].status = "done"
          break
        }
      }
    }
    notes["Tasks"] = tasks
    localStorage.setItem("notes", JSON.stringify(notes))
  }
    
  return (
    <NoteContext.Provider value={{ setNote, getNote, destroyNote, getAllNotes, helia, addTask, editTask }}>
      {children}
    </NoteContext.Provider>
  )
}