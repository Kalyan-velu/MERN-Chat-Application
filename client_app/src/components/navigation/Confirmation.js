import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Logout} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function AlertDialog() {
	const [ open, setOpen ] = React.useState( false );
	const navigate = useNavigate();

	const logOutHandler = () => {
		localStorage.removeItem( "userInfo" );
		navigate( '/' )
	}

	const handleClickOpen = () => {
		setOpen( true );
	};

	const handleClose = () => {
		setOpen( false );
	};

	return (
		<div>
			<Tooltip title={"Log Out"}>
				<IconButton onClick={handleClickOpen}>
					<Logout fontSize="small"/>
				</IconButton>
			</Tooltip>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Are You Sure ?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You have to log in again !!<br/>
						Until then Goodbye❤️❤️
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button onClick={logOutHandler} autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
