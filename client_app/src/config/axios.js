import axios from "axios"
//user
export const authInstance = axios.create( {
	baseURL: "http://localhost:8000/api/user",
	timeout: 1000,
} )

export const chatInstance = axios.create( {
	baseURL: "http://localhost:8000/api/chat"
} )


