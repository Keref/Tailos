import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import axios from "axios"
import replaceAsync from "string-replace-async";
import { PinataSDK } from "pinata";


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
            // get ipfs file through pinata
            try {
              console.log("getting", part)
              const pinata = new PinataSDK({
                pinataJwt: localStorage.getItem("pinataJwt"),
                pinataGateway: "blush-genuine-alpaca-303.mypinata.cloud",
              });
              const file = await pinata.gateways.get(part)

              console.log(file)
              return part
            }
            catch(e){
              console.log(e)
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
    <div className="flex">
      <h2>Intro</h2>
      [<a href="#" onClick={()=>{setActiveNote("Intro")}}>Edit</a>]
    </div>
    <section id="overviewMd">
        <MarkdownToHtml content={expanded ? flattenedOverview: notes["Overview"]} />
    </section>
  </div>)
}