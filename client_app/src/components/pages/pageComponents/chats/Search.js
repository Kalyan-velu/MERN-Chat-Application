import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {Button, IconButton} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {SearchTwoTone} from "@mui/icons-material";
import {ChatState} from "../../../context/ChatProvider";
import {authInstance} from "../../../../config/axios";
import ChatLoading from "../loading/ChatLoading";
import UserListItem from "../userAvater/UserList";


const Search = styled( 'div' )( ({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha( theme.palette.common.white, 0.15 ),
	'&:hover': {
		backgroundColor: alpha( theme.palette.common.white, 0.25 ),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up( 'sm' )]: {
		marginLeft: theme.spacing( 1 ),
		width: 'auto',
	},
}) );

const SearchIconWrapper = styled( 'div' )( ({theme}) => ({
	padding: theme.spacing( 0, 2 ),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}) );

const StyledInputBase = styled( InputBase )( ({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing( 1, 1, 1, 0 ),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing( 4 )})`,
		transition: theme.transitions.create( 'width' ),
		width: '100%',
		[theme.breakpoints.up( 'sm' )]: {
			width: '12ch',
		},
	},
}) );

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #5325g',
	borderRadius: "8px",
	boxShadow: 24,
	p: 4,
};

export default function SearchModal() {
	const [ open, setOpen ] = React.useState( false );
	const [ search, setSearch ] = React.useState( '' );
	const [ searchResults, setSearchResults ] = React.useState( [] );
	const [ error, setError ] = React.useState( null );
	const [ loading, setLoading ] = React.useState( false );
	const {setSelectedChat, user, chats, setChats} = ChatState()

	const handleOpen = () => setOpen( true );
	const handleClose = () => setOpen( false );

	const handleSearch = async () => {
		if (!search) {
			setError( "Please Enter Something" )
		}

		try {
			setLoading( true )

			const response = await authInstance.get( `http://localhost:8000/api/user?search=${search}`,
				{
					headers: {Authorization: `Bearer ${user.token}`}
				} )
			console.log( response.data )
			setLoading( false )
			setSearchResults( response.data )
			console.log( search )
		} catch (err) {
			console.log( err )
		}
	}
	const accessChat = async (userId) => {
		console.log( userId )
	}

	return (
		<div>
			<IconButton onClick={handleOpen}> <SearchTwoTone/></IconButton>
			<Modal
				keepMounted
				open={open}
				onClose={handleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<Box sx={style}>
					<Typography id="keep-mounted-modal-title" variant="h6" component="h2">
						Search
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchTwoTone/>
						</SearchIconWrapper>
						<StyledInputBase
							value={search}
							onChange={(e) => {
								setSearch( e.target.value )
							}}
							placeholder="Search…"
							inputProps={{'aria-label': 'search'}}
						/>
					</Search>
					<Button fullWidth onClick={handleSearch}>Search</Button>
					<Box sx={{backgroundColor: "#fff"}}>
						{
							loading ? (<ChatLoading/>) : (
								searchResults?.map( (user) => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() => accessChat( user._id )}/>
								) )
							)
						}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
