import axios from "axios";
import loginService from './login'
const baseUrl = '/api/users'

const getUser = () => {
  const userLoginJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (userLoginJSON) {
    return userLoginJSON
  }
}

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const saveUser = async (username, password) => {
  try {
    const user = await loginService.login({username, password})
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    return user
  } catch (e) {
    console.log(e)
  }
}

const removeUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
}

export default {getAllUsers, getUser, saveUser, removeUser}