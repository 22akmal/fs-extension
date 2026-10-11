import { useContext } from "react" 
import CounterContext from "../counterContext"

const AnecdoteList = () => {
  const {anecdotes, deleteAnecdote} = useContext(CounterContext)

  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><span>{anecdote.content}</span><button onClick={() => deleteAnecdote(anecdote.id)}>delete</button></li>)}
    </ul>
  </div>
  )
}

export default AnecdoteList
