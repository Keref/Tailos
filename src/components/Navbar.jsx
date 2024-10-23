import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react"
import { NoteContext } from "../notes/NoteContext"


export default function Navbar ({route, setRoute}) {
  const { getCommunities, communityId, setCommunityId } = useContext(NoteContext)
  const [communities, setCommunities] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    const getComm = async () => {
      let comm = await getCommunities()
      if (!comm.includes(communityId)) comm.push(communityId)
      setCommunities(comm)
    }
    getComm()
  }, [])
  
  return (<div className="navbar bg-base-100 w-full">
  <div className="flex">
    <a className="btn btn-ghost text-xl">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
    </svg>
    TAILOS</a>
  </div>
  <div className="flex-1 flex-row justify-end">
      <div>Workspace: </div>
      { communities.length > 0 ?
        <select className="select w-48 max-w-xs" onChange={(e)=>{setCommunityId(e.target.value)}}
          defaultValue={communityId}
        >
          {
            communities.map(c => {
              return (<option value={c} key={c}>{c}</option>)
            })
          }
        </select>
        : <></>
      }
      <Link to="/communities/create">
        <button className="btn btn-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </Link>
      
    <ul className="menu menu-horizontal px-1 text-xl">
      <li><Link to="/">Overview</Link></li>
      <li><Link to="/notes">Notes</Link></li>
      <li><Link to="/chat">Chat</Link></li>
      <li><Link to="/tasks">Tasks</Link></li>
      {/*<li><Link to="/communities">Communities</Link></li>*/}
      <li><button className="btn btn-primary ml-4">Connect Wallet</button></li>
    </ul>
  </div>
</div>)
}