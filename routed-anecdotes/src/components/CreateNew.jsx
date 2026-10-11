import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/index"
import { useContext } from "react"
import CounterContext from "../counterContext"

const CreateNew = () => {
  const [content, resetContent] = useField('content')
  const [author, resetAuthor] = useField('author')
  const [info, resetInfo] = useField('info')
  const {addAnecdote} = useContext(CounterContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate("/")
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="button">reset</button>
      </form>
    </div>
  )
}

export default CreateNew
