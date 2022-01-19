import React, {useEffect, useState} from 'react'
import MyChats from "../pageComponents/Chats";
import ChatBox from "../pageComponents/ChatBox";
import {Box} from "@mui/system";
import Navigation from "../../navigation/Navigation";
import axios from "axios";


const ChatPage = () => {
	const [ chats, setChats ] = useState( [] );
	const fetchChats = async () => {
		const {data} = await axios.get( `http://localhost:8000/api/chat` );
		console.log( data );
		setChats( data )
	}
	useEffect( () => {
		fetchChats().then()
	}, [] );

	return (
		<div style={{width: "100%"}}>
			<Navigation/>
			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				height: "100%"
			}}>
				<MyChats chats={chats}/>
				<ChatBox/>
			</Box>
		</div>
	)
}
export default ChatPage
