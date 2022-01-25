import React from 'react'
import {Box} from "@mui/system";
import {Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {Logout, Notifications} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import ProfileModal from "../pages/pageComponents/profileSettings/profileModal";
import {ChatState} from "../context/ChatProvider";


export default function Navigation() {
	const [ anchorEl, setAnchorEl ] = React.useState( false );
	const {user} = ChatState()
	const openM = Boolean( anchorEl );
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl( event.currentTarget );
	};
	const handleClose = () => {
		setAnchorEl( null );
	};
	const logOutHandler = () => {
		localStorage.removeItem( "userInfo" )
		navigate( '/' )
	}
	return (
		<div style={{
			marginTop: "2px",
			paddingBottom: "10px"
		}}>
			<Box sx={{
				flexGrow: 1,
				backgroundColor: "#591980",
				borderRadius: "10px"
			}}>
				<Toolbar>
					<Typography
						variant="h5"
						position={"static"}
						noWrap
						component="div"
						sx={{
							color: "#fff",
							fontFamily: [ 'Monoton', 'cursive' ],
						}}
					>
						Chat
					</Typography>
					<div style={{flexGrow: 0.3}}/>
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
							<Avatar alt={user.username} src={user.pic}/>
						</IconButton>
					</Tooltip>
					<div style={{flexGrow: 1}}/>
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
					</div>
				</Toolbar>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={openM}
					onClose={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1,
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
								width: 15,
								height: 15,
								backgroundColor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>

					<MenuItem>
						<ProfileModal user={user}/>
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

