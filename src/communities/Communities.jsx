import CreateCommunity from "./CreateCommunity"
import ListCommunities from "./ListCommunities"
import CommunityProfile from "./CommunityProfile"

export default function Communities () {
  
  return (<div role="tablist" className="tabs tabs-bordered">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="List" />
  <div role="tabpanel" className="tab-content p-10">ListCommunities</div>

  <input
    type="radio"
    name="my_tabs_1"
    role="tab"
    className="tab"
    aria-label="Community Profile"
    defaultChecked />
  <div role="tabpanel" className="tab-content p-10">
   <CommunityProfile />
  </div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Create" />
  <div role="tabpanel" className="tab-content p-10">
    <CreateCommunity />
  </div>
</div>)
}