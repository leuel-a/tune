import axios from 'axios'
import { LoginType } from '../../schemas/authSchemas'

// TODO: create error types for the login, like invalid email or password
// TODO: also create generic error type for bad request, may be a global one
const url = 'http://localhost:5000/api'

export const loginUser = async (input: LoginType) => {
  try {
    const response = await axios.post(`${url}/auth/login`, input)
    return response.data
  } catch (error) {
    console.error(`Error logging in: ${error}`)
    throw error
  }
}
