import * as React from 'react'
import {ChatState} from "../../../../../context/ChatProvider";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import {ArrowBackIos} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import {getSender, getSenderFull} from "../../../../../../config/ChatLog";
import UserProfileModal from "../../../profile/UserProfileModal";
import GroupModal from "../../../profile/GroupModal";
import {messageInstance} from "../../../../../../config/axios";
import ChatScroll from "../../ChatScroll";
import {io} from "socket.io-client";

const ENDPOINT = "http://localhost:8000"
let socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {
	const [ messages, setMessages ] = React.useState( [] );
	const [ newMessage, setNewMessage ] = React.useState( "" );
	const [ loading, setLoading ] = React.useState( false );
	const [ typing, setTyping ] = React.useState( false );
	const [ isTyping, setIsTyping ] = React.useState( false );
	const [ socketConnected, setSocketConnected ] = React.useState( false );
	const {user, selectedChat, setSelectedChat} = ChatState()


	async function fetchMessages() {
		if (!selectedChat) {
			return console.log( "nothing" )
		}

		try {
			setLoading( true )
			const response = await messageInstance.get( `/${selectedChat._id}`, {
				headers: {
					"Authorization": `Bearer ${user.token}`
				}
			} )
			console.log( response.data )
			setMessages( response.data )
			setLoading( false )

			socket.emit( "join chat", selectedChat._id )
		} catch (e) {
			console.log( e )
			setLoading( false )
		}
	}

	async function sendMessage(e) {
		if (e.key === "Enter" && newMessage) {
			socket.emit( "stop typing", selectedChat._id );
			try {
				setNewMessage( "" );
				const response = await messageInstance.post( '/', {
					"content": newMessage,
					"chatId": selectedChat._id
				}, {
					headers: {
						"Authorization": `Bearer ${user.token}`
					}
				} )
				socket.emit( "new message", response.data )
				setMessages( [ ...messages, response.data ] )
			} catch (e) {
				console.log( e )
			}
		}

	}

	React.useEffect( () => {
		socket = io( ENDPOINT );
		socket.emit( "setup", user );
		socket.on( "connected", () => setSocketConnected( true ) )
		socket.on( 'typing', () => setIsTyping( true ) )
		socket.on( 'stop typing', () => setIsTyping( false ) )
	}, [] )

	React.useEffect( () => {
		// eslint-disable-next-line
		fetchMessages();

		selectedChatCompare = selectedChat;
	}, [ selectedChat ] );

	React.useEffect( () => {
		socket.on( 'message received', (newMessageReceived) => {
			if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
				//Give Notification
			} else {
				setMessages( [ ...messages, newMessageReceived ] )
			}
		} )
	} );


	function typingHandler(e) {
		setNewMessage( e.target.value );

		if (!socketConnected) return;
		if (!typing) {
			setTyping( true )
			socket.emit( 'typing', selectedChat._id )
		}
		let lastTyping = new Date().getTime()
		let timeLength = 1000;
		setTimeout( () => {
			let timeNow = new Date().getTime();
			let timeDiff = timeNow - lastTyping;

			if (timeDiff >= timeLength && typing) {
				socket.emit( 'stop typing', selectedChat._id )
				setTyping( false )
			}
		}, timeLength )
	}

	return (
		<>{selectedChat ?
			(<>
					<Box
						width={"100%"}
						display={"flex"}
						justifyContent={"space-around"}
						alignItems={"center"}
					>
						<IconButton
							onClick={() => setSelectedChat( "" )}
						>
							<ArrowBackIos/>
						</IconButton>

						<div style={{flexGrow: "1"}}/>
						{!selectedChat.isGroupChat ? (
							<>

								<div style={{flexGrow: "1"}}/>
								<Typography
									fontSize={"20px"}>
									{getSender( user, selectedChat.users ).toUpperCase()}
								</Typography>
								<div style={{flexGrow: "1"}}/>
							</>
						) : (
							<>
								<div style={{flexGrow: "1"}}/>
								<Typography
									fontSize={"20px"}>
									{selectedChat.chatName.toUpperCase()}
								</Typography>
								<div style={{flexGrow: "1"}}/>
							</>
						)}

						<div style={{flexGrow: "1"}}/>
						{!selectedChat.isGroupChat ? (
							<>
								<UserProfileModal
									user={getSenderFull( user, selectedChat.users )}/>
							</>
						) : (
							<>
								<GroupModal
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}/>
							</>
						)}
					</Box>
					<Box
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"flex-end"}
						p={3}
						bgcolor={"#110202"}
						style={{overflowY: "hidden"}}>
						{loading ? (
							<div>
								<iframe src="https://embed.lottiefiles.com/animation/53761"/>
							</div>
						) : (
							<div className={"messages"}>
								<ChatScroll messages={messages}/>
							</div>
						)}
						{isTyping ? <div>Loading...</div> : null}
						<TextField
							variant={"outlined"}
							margin={'dense'}
							size={"small"}
							onKeyDown={sendMessage}
							onChange={typingHandler}
							value={newMessage}
						/>
					</Box>
				</>
			) : (
				<Box
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					h={"100%"}
				>
					<Typography
						variant={"h3"}
						paddingTop={"25%"}
						pb={3}
					>
						Click on a chat to start chatting
					</Typography>
				</Box>
			)
		}
		</>

	)

}
export default SingleChat
