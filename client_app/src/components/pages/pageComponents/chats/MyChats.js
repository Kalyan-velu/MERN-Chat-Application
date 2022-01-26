import React, {useState} from 'react'
import Box from "@mui/system/Box";
import {ChatState} from "../../../context/ChatProvider";
import {authInstance} from "../../../../config/axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputBase from '@mui/material/InputBase';
import {alpha, styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {Container} from "@mui/material";
import Modal from "@mui/material/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";


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


const Alert = React.forwardRef( function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
} )
export default function MyChats() {
	const [ search, setSearch ] = useState( " " )
	const [ error, setError ] = useState( null );
	const [ openS, setOpenS ] = React.useState( false );
	const [ openM, setOpenM ] = useState( true )
	const [ searchResults, setSearchResults ] = useState( [] );
	const [ loggedUser, setLoggedUser ] = useState();
	const {user, chats, setChats} = ChatState()

	const handleCloseE = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenS( false );
		setOpenM( false )
	};

	console.log( search )

	const handleSearch = async () => {
		try {
			const {response} = await authInstance.get( `?search=${search}`,
				{
					headers:
						{
							Authorization: `Bearer ${user.token}`,
						}
				} )
			console.log( response.data )
			setSearchResults( response.data )
		} catch (e) {
			setError( e.response.data.message )
		}
	};


	return (
		<>
			<Box sx={{
				backgroundColor: "#bba6d2",
				height: "86vh",
				borderRadius: "10px"
			}}>
				<Box sx={{
					padding: 2
				}}>
					<Search>
						<SearchIconWrapper>
							<SearchIcon/>
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


				</Box>
				<Container maxWidth={"sm"}>
					{error ? <Snackbar open={openS} autoHideDuration={3000} onClose={handleCloseE}>
							<Alert onClose={handleCloseE} severity="error" sx={{width: '100%'}}>
								{error}
							</Alert>
						</Snackbar>
						: <Modal open={openM}>
							<ModalHeader>Search</ModalHeader>
						</Modal>}

				</Container>
			</Box>
		</>
	)
}
