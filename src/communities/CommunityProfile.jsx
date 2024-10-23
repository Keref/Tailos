import { useParams  } from "react-router-dom"
import { useContext } from "react"
import { NoteContext } from "../notes/NoteContext"
import CommunityOverview from "./CommunityOverview"


const bg = "https://images.unsplash.com/photo-1508614999368-9260051292e5?q=80&w=1280&h=250&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const bg2 = "https://images.unsplash.com/photo-1711945344720-243fe94b6b99?q=80&w=2532&h=250&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export default function CommunityProfile(){
  const params = useParams()
  const { communityId } = useContext(NoteContext)
  const comm = params.communityId ?? communityId

  return (<div className="">
    <div className="card bg-base-100 image-full w-full shadow-xl p-0">
      <figure className="">
        <img
          src={bg2}
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between align-center mt-16">
          <div className="text-4xl">{communityId} Community</div>
          <div className="card-actions justify-end">
            <button className="btn btn-warning btn-outline">Join</button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-row gap-4 mt-8">
      <div className="basis-3/4">
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_2" role="tab" className="tab text-2xl" aria-label="Overview" defaultChecked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <CommunityOverview />
          </div>
          <input type="radio" name="my_tabs_2" role="tab" className="tab text-2xl" aria-label="Charter" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            Tab content 1
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab text-2xl" aria-label="Proposals" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            Tab content 2
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab text-2xl" aria-label="Jobs" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            Tab content 3
          </div>
          <input type="radio" name="my_tabs_2" role="tab" className="tab text-2xl" aria-label="Chat" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            Tab content 3
          </div>
        </div>

      </div>
      <div className="basis-1/4">
        <div className="card bg-primary text-primary-content">
        Community AI can create jobs against tokens.
        <br/>
        <br/>
        There are several default jobs to bootstrap a token and its distribution.
        </div>
      </div>
    </div>
  </div>)
}