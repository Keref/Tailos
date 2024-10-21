import { useState, useEffect } from "react"
    
export default function NoteEditor ({title, content, saveNote, destroyNote}) {
  const [newContent, setContent] = useState(content)

  useEffect(()=>{
    setContent(content)
  }, [title, content])
  
  return (<div className="flex flex-col flex-1">
    
    <div className="flex flex-row flex-1 justify-between mb-4">
      <h1>{title}</h1>
      <div>
        <button onClick={()=>{saveNote(title, newContent)}} className="btn">Save</button>
        <button onClick={()=>{destroyNote(title, newContent)}} className="btn btn-warning">Destroy</button>
      </div>
    </div>
    <textarea
      placeholder="Bio"
      className="textarea textarea-bordered textarea-lg w-full min-h-[800px] text-xl"
      onChange={(e) => { setContent(e.target.value) }}
      value={newContent}
      >
    </textarea>
  
  </div>)
}