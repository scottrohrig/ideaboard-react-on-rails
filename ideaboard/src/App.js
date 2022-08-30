import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css';

import { API_URL } from './config'
import { Idea, IdeaForm } from './components/Idea'



function App() {

  const [ideas, setIdeas] = useState([])
  const [editId, setEditId] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL)
      const json = await response.json()
      setIdeas(json)

    })()
  }, [])

  const addNewIdea = async () => {
    const response = await axios.post(API_URL,
      { idea: { title: '', body: '' } })
    const idea = response.data
    setIdeas([idea, ...ideas])
    setEditId(idea.id)
  }

  const updateIdea = async (idea) => {
    const updatedIdeas = ideas.map(i => i.id === idea.id ? idea : i)
    setIdeas(updatedIdeas)
    setNotification('All changes saved')
    setTimeout(()=>{
      setNotification('')
    }, 1500)
  }

  const deleteIdea = async (id) => {
    axios.delete(API_URL + `/${id}`)
    .then(response => {
      const newIdeas = ideas.filter(idea => idea.id !== id)
      setIdeas(newIdeas)
    })
  }

  return (
    <div className='App'>
      <header>
        <h1>Idea Board</h1>
      </header>

      <div className='content'>
        <section>
          <div className='dash-wrap'>
            <button className='newIdeaButton' onClick={addNewIdea} >New Idea</button>
            <span className='notification'>{notification}</span>
          </div>
          <ul>
            {ideas.length && ideas.map(idea =>
              editId === idea.id
                ? <IdeaForm idea={idea} key={idea.id} updateIdea={updateIdea} />
                : <Idea key={idea.id} idea={idea} setEditId={setEditId} deleteIdea={deleteIdea} />
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
