import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import axios from "axios"
import replaceAsync from "string-replace-async";


function MarkdownToHtml({ content }){
  return(
  <div className="prose lg:prose-xl">
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
  )
}


export default function NotesOverview ({notes, setActiveNote}) {
  const [expanded, setExpanded] = useState(true)
  const [flattenedOverview, setFlattenedOverview] = useState()

  useEffect(() => {
    const flattenOverview = async () => {
      let overview = notes["Overview"]
      if (!overview) return overview
      
      for (let x =0; x< 2; x++){
        overview = await replaceAsync(overview, /\[\[[a-zA-z0-9]*\]\]/g, async (x) => { 
          let part = x.replace(/\[|\]/g, "")

          if (notes.hasOwnProperty(part))
            return "(edit " + part + ") " + notes[part]
          else {
            // get ipfs file through helia
            try {
              const content = await axios.get("https://ipfs.io/ipfs/"+part)
              console.log(content.data)
              return "*" + content.data["title"] +"* "+content.data["content"]
            }
            catch(e){
              console.log('IPFS reference', e)
              return part
            }
          }
        })
      }
      setFlattenedOverview(overview)
    }
    flattenOverview()
  }, [JSON.stringify(notes)])


  return (<div>
    <div className="flex justify-between">
      <h1>Context Overview</h1>
      <button className="btn" onClick={()=>{setExpanded(!expanded)}}>{expanded ? "Collapse All" : "Expand All"}</button>
    </div>
    <section id="overviewMd">
        <MarkdownToHtml content={expanded ? flattenedOverview: notes["Overview"]} />
    </section>
  </div>)
}