import axios from "axios"
//user
export const authInstance = axios.create( {
	baseURL: "http://localhost:8000/api/user"
} )

export const chatInstance = axios.create( {
	baseURL: "http://localhost:8000/api/chat"
} )


