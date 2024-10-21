import { useState } from "react"

export default function NotesSidebar({ notes, setActiveNote, saveNote }) {
  const [title, setTitle] = useState("")
  
  return (
    <div className="min-w-64 bg-pink-100 flex flex-col">
      <div>
        <input type="text" placeholder="title" className="input" onChange={(e) => { setTitle(e.target.value) }}/>
        <button className="btn" onClick={() => {saveNote(title, "")}} disabled={!title}>+</button>
      </div>
      <div onClick={() => {setActiveNote("")}}>
        Overview
      </div>
    {
      Object.keys(notes).map(n => {
        return (
          <div key={n} onClick={() => {setActiveNote(n)}}>
            {n}
          </div>
      )})
    }
    </div>
  )
}