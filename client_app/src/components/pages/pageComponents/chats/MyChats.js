import React, {useEffect} from 'react'
import Box from "@mui/system/Box";
import SearchModal from "./Search";
import {ChatState} from "../../../context/ChatProvider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {chatInstance} from "../../../../config/axios";
import Typography from "@mui/material/Typography";
import ChatLoading from "../loading/ChatLoading";
import Stack from "@mui/material/Stack";
import {getSender} from "../../../../config/ChatLog";
import NewGroup from "./groupChat/NewGroup";


const Alert = React.forwardRef( function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
} );
export default function MyChats() {
	const [ openE, setOpenE ] = React.useState( false );
	const [ error, setError ] = React.useState( '' );
	const [ loggedUser, setLoggedUser ] = React.useState();
	const {user, chats, selectedChat, setSelectedChat, setChats} = ChatState()

	const handleClose = () => setOpenE( false );

	const fetchChats = async () => {
		try {
			const response = await chatInstance.get( `/`, {
				headers:
					{
						Authorization: `Bearer ${user.token}`
					}
			} )
			console.log( response.data )
			setChats( response.data )
		} catch (e) {
			setOpenE( true )
			setError( 'Failed to load chat' )
		}
	}
	useEffect( () => {
		setLoggedUser( JSON.parse( localStorage.getItem( "userInfo" ) ) )
		fetchChats()
	}, [] );


	console.log( selectedChat )
	return (
		<>
			<Box
				display={{base: selectedChat ? null : "flex", md: "flex"}}
				flexDirection={"column"}
				width={{base: '100%', 'md': '23%'}}
				height={"89vh"}
				sx={{
					backgroundColor: "#8B66D8",
					borderRadius: "0 0 10px 10px"
				}}>
				<Box
					borderRadius={"30px"}
					margin={"20px"}
					bgcolor={"inherit"}>
					<SearchModal
						setError={setError}
						setOpenE={setOpenE}
						user={user}
					/>
				</Box>
				<Box
					fontSize={{base: "16px", 'md': '20px'}}
					display={"flex"}
					width={'100%'}
					justifyContent="space-around"
					alignItem={"center"}>
					<Typography variant={'h5'}>Chats</Typography>
					<NewGroup/>
				</Box>
				<Box
					d={"flex"}
					flexDirection={"column"}
					p={3}
					height={"100%"}
					bgcolor={"#8B66D8"}
					borderRadius={"10px"}
					overflowy={"hidden"}>
					{chats ? (
						<Stack
							spacing={1}
						>{chats.map( (chat) => (
							<Box
								onClick={() => setSelectedChat( chat )}
								cursor={"pointer"}
								bgcolor={selectedChat === chat ? '#6ed2d2' : "#EEEFC5"}
								px={3}
								py={2}
								borderRadius={'5px'}
								key={chat._id}
							>
								<Typography
									varient={'h4'}
								>
									{!chat.isGroupChat ?
										getSender( loggedUser, chat.users )
										: chat.chatName}
								</Typography>
							</Box>
						) )}
						</Stack>
					) : (
						<ChatLoading/>
					)}
				</Box>
			</Box>
			{error ?
				<Snackbar open={openE} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
						{error}
					</Alert>
				</Snackbar>
				: null}
		</>
	)
}
