import React from 'react'
import {ChatState} from "../../../context/ChatProvider";
import Box from "@mui/system/Box";
import SingleChat from "./messages/privateChat/SingleChat";

export default function ChatBox({fetchAgain, setFetchAgain}) {
	const {selectedChat} = ChatState()
	return (
		<Box
			d={{base: selectedChat ? "flex" : "none", 'md': "flex"}}
			alignItems={"center"}
			flexDirection={"column"}
			width={{base: '100%', 'md': "79%"}}
			bgcolor={"#d1c7db"}
			height={"100%"}
			borderRadius={'0 0 10px 0px'}
			alignContent={"center"}
		>
			<SingleChat
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}/>
		</Box>
	)
}
