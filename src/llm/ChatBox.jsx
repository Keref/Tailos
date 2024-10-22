import { useState, useEffect, useContext } from "react"
import OpenAI from 'openai';
import { NoteContext } from "../notes/NoteContext"
import ReactMarkdown from 'react-markdown'

export default function ChatBox(){
  const [apiForm, setApiForm] = useState()
  const [apiKey, setApiKey] = useState("")
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])
  const [streaming, setStreaming] = useState("")
  const [allowSend, setAllowSend] = useState(true)
  const [notes, setNotes] = useState({})
  
  const gptModel = "gpt-4o-mini"
  
  const { getAllNotes } = useContext(NoteContext)
  useEffect(() => {
    const getNotes = async () => {
      const notes = await getAllNotes()
      setNotes(notes)
    }
    getNotes()
  }, [])
  
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
  
  
  useEffect(() => {
    const getKey = async () => {
      const apiKey = await localStorage.getItem("gptApiKey")
      setApiKey(apiKey)
    }
    getKey()
  }, [])
  
  
  const sendMessage = async () => {
    if (!apiKey) return;
    
    try {
      let m = messages
      setMessages([...messages, {from: 'me', msg: question}])
      let q = question
      let context = flattenedOverview()
      let query = "Context: " + context + (q ? "\n\nMy query to answer adapted to the context: "+q : "")
      console.log("fullquery", query)
      // TODO include context
      setQuestion("")
      
      setAllowSend(false)
      const client = new OpenAI({ 
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      
      const stream = await client.chat.completions.create({
        model: gptModel,
        messages: [{ role: 'user', content: query }],
        stream: true,
      });
      let answer = ""
      
      for await (const chunk of stream) {
        answer += chunk.choices[0]?.delta?.content || ''
        setStreaming(answer)
      }

      setMessages([...messages, {from: 'me', msg: question}, {from: 'llm', msg: answer}])
      setStreaming("")
    }
    catch(e){
      console.log("Chat", e)
    }
    
    setAllowSend(true)
  }
  
  return (<div className="flex flex-col ">
    <div>
      <div className="flex bg-blue-100 p-2 gap-2 w-fit">
        <input type="text" className="input w-96" 
          value={apiForm}
          placeholder="OpenAI API key"
          onChange={(e) => { setApiForm(e.target.value) }} 
        />
        <button 
          disabled={!apiForm}
          onClick={() => {
            setApiKey(apiForm); 
            localStorage.setItem("gptApiKey", apiForm); 
            setApiForm("")}}
          >Set API key</button>
      </div>
      <span className="float-right">Model: {gptModel}</span>
    </div>
    <div className="divider"></div>
    <div>
    {
      messages.map((m, i) => {
        return (<div key={i} className="p-2 text-lg flex">
          <div className={"badge badge-outline mr-2 "+(m.from == "me" ? "badge-primary" : "badge-accent")}>{m.from}</div>
          <div className=" prose lg:prose-xl "><ReactMarkdown>{m.msg}</ReactMarkdown></div>
        </div>)
      })
    }
    </div>
    
    <div className="divider"></div>
    <div className="flex ">
      <textarea 
        className="w-full border h-96"
        value={question}
        onChange={(e) => { setQuestion(e.target.value) }} 
      >
      </textarea>
      <button 
        className="btn"
        onClick={() => { sendMessage() }} 
        disabled={!allowSend && !question}
      >
        Send
      </button>
    </div>
  </div>
  )
}