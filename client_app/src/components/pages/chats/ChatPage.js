import React, {lazy, Suspense, useEffect, useState} from 'react'
import {Box} from "@mui/system";
import Navigation from "../../navigation/Navigation";
import axios from "axios";
import lottie from "lottie-web";
import loading from "../../animations/loading-animation.json";

const MyChats = lazy( () => import("../pageComponents/Chats") )
const ChatBox = lazy( () => import ("../pageComponents/ChatBox") )


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
	React.useEffect( () => {
		lottie.loadAnimation( {
			container: document.querySelector( "#suspens" ),
			animationData: loading,
			loop: true
		} );
	}, [] );

	return (
		<div style={{width: "100%"}}>
			<Navigation/>
			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				height: "100%"
			}}><Suspense style={
				{}} fallback={<div/>}>
				<MyChats chats={chats}/>
				<ChatBox/>
			</Suspense>
			</Box>
		</div>
	)
}
export default ChatPage
