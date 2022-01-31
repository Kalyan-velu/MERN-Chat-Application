import React from 'react'
import {Box} from "@mui/system";
import {IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
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
			width: "23%",
			marginTop: "2px",
		}}>
			<Box sx={{
				flexGrow: 1,
				backgroundColor: "#591980",
				borderRadius: "10px 0 0 0"
			}}
			     fixed>
				<Toolbar>
					<ProfileModal user={user}/>
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
						<Tooltip title="Log Out">
							<IconButton onClick={logOutHandler}>
								<Logout fontSize="small"/>
							</IconButton>
						</Tooltip>
					</div>
				</Toolbar>

			</Box>

		</div>
	)
}

