
function TaskBox({ content, editTask }){
  const deleteTask = async () => {
    editTask(content.id, "delete")
  }
  
  return (<div className="">
    <div className="card-body">
      <h2 className="card-title">{content.title}</h2>
      <div className="flex justify-between flex-1">
        <div>{content.task}</div>
        <div>Bounty: {content.rewardInTokens}</div>
      </div>
    </div>
  </div>)
}


export default function Tasks({ notes, addTask, editTask }){
  return (<div>
    <h1>Tasks</h1>
    {
      notes?.["Tasks"]?.map((t, i) => {
        return (<TaskBox content={t} editTask={editTask} />)
      })
    }
  </div>)
}