import { useUsers } from "../hooks/useUsers"
import { useMatch } from "react-router-dom"

const User = () => {
  const {users, isPendingUser} = useUsers()
  const match = useMatch('/users/:id')
  const user = match ? users.find(user => user.id === match.params.id) : null

  if (isPendingUser) {
    return (<h1>Loading data</h1>)
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User