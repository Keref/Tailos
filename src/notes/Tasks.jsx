import { useState, useContext, useEffect } from "react"
import { NoteContext } from "./NoteContext"

function TaskBox({ task, editTask }){
  const deleteTask = async () => {
    editTask(task.id, "delete")
  }

  return (<div className="card border mt-8">
    <div className="card-body">
      <div className="flex justify-between flex-1 gap-1">
        <div className="flex flex-col gap-2">
          <div className="card-title">{task.title}</div>
          <div>{task.task}</div>
          <div className={"badge "+(task.status == "pending" ? "badge-warning" : "badge-success")}>{task.status}</div>
        </div>
        <div className="card border p-6">
          <div className="text-xs">Bounty</div>
          <div className="text-4xl font-bold">{task.rewardInTokens}</div>
        </div>
      </div>
      <div className="">
        <button className="btn btn-sm " onClick={()=>{if(window.confirm("Mark task as done?")) editTask(task.id, "set_done")}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

        </button>
        <button className="ml-4 btn btn-sm btn-warning" onClick={()=>{if(window.confirm("Delete Task?")) deleteTask()}} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

        </button>
        
      </div>
    </div>
  </div>)
}


export default function Tasks(){
  const [notes, setNotes] = useState({})
  const [hiddenCompeted, setHiddenCompleted] = useState(true)
  const { communityId, getAllNotes, editTask } = useContext(NoteContext)

  const getNotes = async () => {
    const notes = await getAllNotes()
    setNotes(notes ?? {})
  }
  
  const editTaskAndRefresh = async (taskId, action) => {
    await editTask(taskId, action)
    await getNotes()
  }
  
  useEffect(() => {
    getNotes()
  }, [communityId])

  return (<div>
    <h1>Tasks</h1>
    <div className="flex justify-end">
      <span class="text-sm">Hide Completed</span>
      <input type="checkbox" defaultChecked className="checkbox checkbox-sm ml-2" onClick={() => {setHiddenCompleted(!hiddenCompeted)}} />
    </div>
    {
      notes?.["Tasks"]?.map((t, i) => {
        if (!hiddenCompeted || t.status != "done")
          return (<TaskBox task={t} 
            editTask={editTaskAndRefresh}
            />)
      })
    }
  </div>)
}