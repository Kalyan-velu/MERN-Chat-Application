import React from 'react'
import {Box} from "@mui/system";
import {alpha, styled} from '@mui/material/styles';
import {
	Avatar,
	Divider,
	IconButton,
	InputBase,
	ListItemIcon,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {FeedbackOutlined, Logout, Notifications} from "@mui/icons-material";
import Img from "../pages/pageComponents/index.png"
import {useNavigate} from "react-router-dom";


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
		padding: theme.spacing( 1, 2, 1, 0 ),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing( 4 )})`,
		transition: theme.transitions.create( 'width' ),
		width: '100%',
		[theme.breakpoints.up( 'sm' )]: {
			width: '14ch',
			'&:focus': {
				width: '18ch',
			},
		},
	},
}) );


export default function Navigation() {
	const [ anchorEl, setAnchorEl ] = React.useState( false );
	const openM = Boolean( anchorEl );
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl( event.currentTarget );
	};
	const handleClose = () => {
		setAnchorEl( null );
	};
	const logOutHandler = () => {
		navigate( '/app' )
	}
	return (
		<div style={{
			marginTop: "2px"
		}}>
			<Box sx={{
				flexGrow: 1,
				backgroundColor: "#16034b",
				borderRadius: "2px"
			}}>
				<Toolbar>
					<Tooltip title={"Search User to Chat"}>
						<Search>
							<SearchIconWrapper>
								<SearchIcon sx={{color: "#acadad"}}/>
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search For User…"
								inputProps={{'aria-label': 'search'}}
							/>
						</Search>
					</Tooltip>
					<Divider/>
					<div style={{flexGrow: 1}}/>
					<Typography
						variant="h5"
						position={"static"}
						noWrap
						component="div"
						sx={{display: {xs: 'none', sm: 'block'}, color: "#acadad"}}
					>
						Social Chat
					</Typography>
					<div style={{flexGrow: 1}}/>
					<div>
						<Tooltip title="Notifications">
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="open drawer"
								sx={{mr: 2}}>
								<Notifications sx={{color: "#acadad"}}/>

							</IconButton>
						</Tooltip>
						<Tooltip title="Account settings">
							<IconButton
								onClick={handleClick}
								size="large"
								edge="start"
								color="inherit"
								aria-controls={openM ? 'account-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={openM ? 'true' : undefined}
								aria-label="open drawer"
								sx={{mr: 2}}
							>
								<Avatar alt="Remy Sharp" src={Img}/>
							</IconButton>
						</Tooltip>
					</div>
				</Toolbar>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={openM}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 22,
								height: 22,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								backgroundColor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
					<MenuItem>
						<Avatar
							sx={{width: 24, height: 24}}
							alt="Remy Sharp" src={Img}/> Profile
					</MenuItem>
					<MenuItem>
						<Avatar
							sx={{width: 24, height: 24}}
							alt="Remy Sharp" src={Img}/> My account
					</MenuItem>
					<Divider/>
					<MenuItem>
						<ListItemIcon>
							<FeedbackOutlined fontSize="small"/>
						</ListItemIcon>
						Settings
					</MenuItem>
					<MenuItem onClick={logOutHandler}>
						<IconButton>
							<Logout fontSize="small"/>
						</IconButton>
						Logout
					</MenuItem>
				</Menu>
			</Box>

		</div>
	)
}

