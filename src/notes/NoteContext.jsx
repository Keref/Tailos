import { useState, useEffect } from 'react'
import { createContext } from 'react';
import { createHelia } from 'helia';
import axios from "axios"

const SERVER_URL = "http://localhost:3000"

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
  const [communityId, setCommunityId] = useState("me_notes")
  
  useEffect(() => {
    const initHelia = async () => {
      try {
        const helia = await createHelia();
        setHelia(helia);
      } catch(e) {console.log("Helia", e)}
    };
    initHelia()
  }, [])
  
  const getAllNotes = async () => {
    const res = await axios.get(SERVER_URL + "/communities/" + communityId)
    let notes = JSON.parse(res.data || "{}")
    if (!notes.hasOwnProperty("Overview")) {
      notes["Overview"] = overview
    }
    return notes
  }
  
  const save = async (title, content, isDelete) => {
    try {
      const res = await axios.post(SERVER_URL + "/communities/" + communityId, {title: title, content: content, isDelete: isDelete })
    } catch(e) { console.log("Save context", e)}
  }
  
  const getNote = async (title) => {
    const notes = await getAllNotes()
    return notes[title]
  }
  
  const setNote = async (title, content) => {
    await save(title, content)
  }
  
  const destroyNote = async (title) => {
    await save(title, "", true)
  }

  const addTask = async (task) => {
    const notes = await getAllNotes()
    let tasks = notes["Tasks"] || []
    tasks.push({id: "Task_" + new Date().toISOString(), status: "pending", ...task})

    await save("Tasks", tasks)
  }
  
  const editTask = async (id, action, msg) => {
    const notes = await getAllNotes()
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
    await save("Tasks", tasks)
  }
  
  const getCommunities = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/communities")
      return res.data
    } catch(e) { console.log("Save context", e)}
  }
  
  const createCommunity = async (name, overview) => {
    const res = await axios.get(SERVER_URL + "/communities/" + name)
    // community doesnt exist: server returns {}
    if (!res.data){
      let notes = { Overview: overview }
      const res = await axios.post(SERVER_URL + "/communities/" + name, {content: JSON.stringify(notes)})
    }
    setCommunityId(name)
  }
    
  return (
    <NoteContext.Provider value={{ setNote, getNote, destroyNote, getAllNotes, helia, addTask, editTask, 
      getCommunities, setCommunityId, communityId, createCommunity
    }}>
      {children}
    </NoteContext.Provider>
  )
}