import { useState } from "react"
import ReactMarkdown from 'react-markdown'

function MarkdownToHtml({ content }){
  return(
    <ReactMarkdown>{content}</ReactMarkdown>
  )
}


export default function NotesOverview ({notes, setActiveNote}) {
  const [expanded, setExpanded] = useState(true)

  
  const flattenedOverview = () => {
    let overview = notes["Overview"]
    if (!overview) return overview
    for (let x =0; x< 2; x++)
      overview = overview?.replace(/\[\[[a-zA-z]*\]\]/g, function(x) { 
        let part = x.replace(/\[|\]/g, "")
        return "(edit " + part + ") " + notes[part]
        })
    return overview
  }


  return (<div>
    <div className="flex justify-between">
      <h1>Context Overview</h1>
      <button className="btn" onClick={()=>{setExpanded(!expanded)}}>{expanded ? "Collapse All" : "Expand All"}</button>
    </div>
    <div className="flex">
      <h2>Intro</h2>
      [<a href="#" onClick={()=>{setActiveNote("Intro")}}>Edit</a>]
    </div>
    <section id="overviewMd">
        <MarkdownToHtml content={expanded ? flattenedOverview() : notes["Overview"]} />
    </section>
  </div>)
}