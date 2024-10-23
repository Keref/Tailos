import { useState, useContext } from "react"
import { NoteContext } from "../notes/NoteContext"
//import { communityPrompt } from "./defaultPrompt"
import { useNavigate } from "react-router-dom";


const communityPrompt = "## Test promt \n yo"
export default function CreateCommunity() {
  const [name, setName] = useState("")
  const { setCommunityId, setNote, communityId, createCommunity } = useContext(NoteContext)
  const navigate = useNavigate();
  
  const create = async () => {
    await createCommunity(name, communityPrompt)
    navigate("/communities/" + name)
  }
  
  return (<div>
    <h1>Community</h1>
    
    Create a new community:
    
    A community has a name, a token and a charter. The token will have 1,000,000 initial supply and ...
    
    <div className="w-[800px] my-2 flex flex-col gap-2">
      <label className="input input-bordered flex items-center gap-2 mb-2">
        Name
        <input type="text" className="grow" placeholder="Bagholders United" onChange={(e)=>{setName(e.target.value)}} />
      </label>
      
      <button className="btn btn-primary" onClick={()=>{create()}}>Create</button>
    </div>
  </div>) 
}