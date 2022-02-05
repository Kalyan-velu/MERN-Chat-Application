import React from 'react'
import {Box} from "@mui/system";
import {IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {Notifications} from "@mui/icons-material";
import ProfileModal from "../pages/pageComponents/profile/profileModal";
import {ChatState} from "../context/ChatProvider";
import AlertDialog from "./Confirmation";


export default function Navigation() {

	const {user} = ChatState()

	return (
		<div style={{
			width: "100%",
			marginTop: "2px",
		}}>
			<Box sx={{
				flexGrow: 1,
				backgroundColor: "#591980",
				borderRadius: "10px 10px 0 0"
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
					</div>
					<AlertDialog/>
				</Toolbar>

			</Box>

		</div>
	)
}

