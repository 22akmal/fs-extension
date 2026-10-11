import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CounterContext from './counterContext.jsx'
import { useAnecdotes } from './hooks/index.js'

const Root = () => {
  const { anecdotes, addAnecdote, deleteAnecdote } = useAnecdotes()

  return (
    <CounterContext.Provider value={useAnecdotes()} >
      <App />
    </CounterContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <Root/>
)
