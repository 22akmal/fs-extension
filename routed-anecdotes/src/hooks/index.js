import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [{
    name,
    value,
    onChange
  }, reset]
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])
  
  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (newAnecdote) => {
    return await anecdoteService.createNew(newAnecdote).then(response => setAnecdotes(anecdotes.concat(response)))
  }

  const deleteAnecdote = async (anecdoteId) => {
    return await anecdoteService.remove(anecdoteId)
    .then(response => setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== response.id)))
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}
