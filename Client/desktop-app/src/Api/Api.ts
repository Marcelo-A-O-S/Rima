import axios from 'axios'

export const ApiBackEnd = axios.create({
    baseURL:process.env.REACT_APP_API
})
