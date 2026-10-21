import { useUsers } from "../hooks/useUsers"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import {Link} from 'react-router-dom'

const Users = () => {
  const {users, isPendingUser} = useUsers()

  if (isPendingUser) {
    return (<h1>Loading data.....</h1>)
  }
  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper} elevation={0} sx={{border: 'none'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Username</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users