export default function CreateCommunity() {
  
  return (<div>
    <h1>Community</h1>
    
    Create a new community:
    
    A community has a name, a token and a charter. The token will have 1,000,000 initial supply and ...
    
    <div className="w-[800px] my-2 flex flex-col gap-2">
      <label className="input input-bordered flex items-center gap-2 mb-2">
        Name
        <input type="text" className="grow" placeholder="Bagholders United" />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        Ticker
        <input type="text" className="grow" placeholder="BAGS" />
      </label>
      
      Community Charter
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>Pick a note</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      
      <button className="btn btn-primary">Create</button>
    </div>
  </div>) 
}