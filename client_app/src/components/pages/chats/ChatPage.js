import React from 'react'
import MyChats from "../pageComponents/Chats";
import ChatBox from "../pageComponents/ChatBox";
import {Box} from "@mui/system";
import Navigation from "../../navigation/Navigation";


const ChatPage = () => {
	return (
		<div style={{width: "100%"}}>
			<Navigation/>
			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: "10px"
			}}>
				<MyChats/>
				<ChatBox/>
			</Box>
		</div>
	)
}
export default ChatPage
