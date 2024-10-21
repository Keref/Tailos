export default function Navbar ({route, setRoute}) {
  
  return (<div className="navbar bg-base-100 w-full">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a onClick={()=>{setRoute("Notes")}}>Context</a></li>
      <li><a onClick={()=>{setRoute("LLM")}}>LLM</a></li>
      <li><a onClick={()=>{setRoute("Communities")}}>Communities</a></li>
    </ul>
  </div>
</div>)
}