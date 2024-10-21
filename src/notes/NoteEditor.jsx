import { useState, useEffect } from "react"
    
export default function NoteEditor ({title, content, saveNote, destroyNote}) {
  const [newContent, setContent] = useState(content)
  
  useEffect(()=>{
    setContent(content)
  }, [title])
  
  return (<div className="flex flex-col flex-1">
    
    <div className="flex flex-row flex-1 justify-between mb-4">
      <h1>{title}</h1>
      <div>
        <button onClick={()=>{saveNote(title, newContent)}} class="btn">Save</button>
        <button onClick={()=>{destroyNote(title, newContent)}} class="btn btn-warning">Destroy</button>
      </div>
    </div>
    <textarea
      placeholder="Bio"
      className="textarea textarea-bordered textarea-md w-full min-h-96"
      onChange={(e) => { setContent(e.target.value) }}
      defaultValue={newContent}
      >
    </textarea>
  
  </div>)
}