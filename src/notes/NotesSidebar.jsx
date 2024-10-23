import { useState } from "react"

const listStyle = "flex p-2 items-center cursor-pointer hover:text-gray-400"

export default function NotesSidebar({ notes, setActiveNote, saveNote }) {
  const [title, setTitle] = useState("")
  
  return (
    <div className="min-w-64 flex flex-col pt-4">
      <div>
        <input className="input input-bordered input-sm" type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }}/>
        <button className="btn btn-sm" onClick={() => {saveNote(title, "")}} disabled={!title}>+</button>
      </div>
      <div 
        className={listStyle}
        onClick={() => {setActiveNote("")}}
      >
        Overview
      </div>
      <div 
        className={listStyle}
        onClick={() => {setActiveNote("Tasks")}}
      >
        Tasks
      </div>
    {
      Object.keys(notes).map(n => {
        if (n != "Tasks") 
          return (
            <div 
              className={listStyle}
              key={n} 
              onClick={() => {setActiveNote(n)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              {n}
            </div>
      )})
    }
    </div>
  )
}