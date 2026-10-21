import { createContext, useState } from "react";
import blogService from './services/blogs'
import userService from './services/persistentUser'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)

  const initialize = () => {
    const userLoginJSON = userService.getUser()
    if (userLoginJSON) {
      const userData = JSON.parse(userLoginJSON)
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }

  const logout = () => {
    userService.removeUser()
    setUser(null)
  }

  const login = async (username, password) => {
    try {
      const user = userService.saveUser(username, password)
      blogService.setToken(user.token);
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <UserContext.Provider value={{user, setUser, initialize, logout, login}}>
      {props.children}
    </UserContext.Provider>
  )
}