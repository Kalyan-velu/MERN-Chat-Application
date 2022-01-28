import React from 'react'
import Box from "@mui/system/Box";
import SearchModal from "./Search";
import {ChatState} from "../../../context/ChatProvider";


export default function MyChats() {
	const {user} = ChatState()
	return (
		<>
			<Box sx={{
				backgroundColor: "#bba6d2",
				height: "86vh",
				width: "22%",
				borderRadius: "10px"
			}}>
				<SearchModal
					user={user}
				/>
			</Box>
		</>
	)
}
