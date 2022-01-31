import React, {lazy, Suspense} from 'react'
import {Box} from "@mui/system";
import Navigation from "../navigation/Navigation";
import lottie from "lottie-web";
import loading from "../../animations/loading-animation.json";
import {ChatState} from "../context/ChatProvider";

const MyChats = lazy( () => import("./pageComponents/chats/MyChats") )
const ChatBox = lazy( () => import ("./pageComponents/chats/ChatBox") )


const ChatPage = () => {
	const {user} = ChatState()


	React.useEffect( () => {
		lottie.loadAnimation( {
			container: document.querySelector( "#suspens" ),
			animationData: loading,
			loop: true
		} );
	}, [] );

	return (
		<div style={{width: "100%"}}>
			{user && <Navigation/>}
			{user &&
				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					height: "100%"
				}}><Suspense style={
					{}} fallback={<div/>}>
					<MyChats user={user}/>
					<ChatBox/>
				</Suspense>
				</Box>}
		</div>
	)
}
export default ChatPage
