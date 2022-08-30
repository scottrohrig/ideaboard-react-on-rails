import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

export const Idea = ({ idea, setEditId, deleteIdea }) => {
  const handleClick = () => {
    setEditId(idea.id)
  }
  return (
    <li className='tile' onClick={handleClick}>
      <div className='li-info'>
        <strong>{idea.title}</strong>
        <p>{idea.body}</p>
      </div>
      <span className='deleteBtn' onClick={() => deleteIdea(idea.id)}>X</span>
    </li>
  )
}

export const IdeaForm = ({ idea, updateIdea }) => {
  const [title, setTitle] = useState(idea.title)
  const [body, setBody] = useState(idea.body)

  const handleBlur = () => {
    const updatedIdea = { title, body }
    axios.put(API_URL + '/' + idea.id, { idea: updatedIdea }).then(response => {
      updateIdea(response.data)
    }).catch(err => console.log(err))
  }

  return (
    <li className='tile'>
      <form className='li-info' onBlur={handleBlur}>
        <input autoFocus className='input' type='text' name='title' placeholder='Enter a Title' value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className='input' name='body' placeholder='Describe your idea' value={body} onChange={e => setBody(e.target.value)} />
      </form>
    </li>
  )
}
