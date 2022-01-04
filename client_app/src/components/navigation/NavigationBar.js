import React, {useState} from 'react'
import "./NavBar.css"
import Logo from "./Frame 10.png"
import Button from "@mui/material/Button"
import {Link} from 'react-router-dom'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";


export default function NavigationBar() {
	const [ open, setOpen ] = useState( false );

	const handleClickOpen = () => {
		setOpen( true )
	}

	function handleClickClose() {
		setOpen( false )
	}

	return (
		<div className={"navBar-L"}>
			<div className={"Logo"}>
				<img id={"img"} src={Logo} alt={"Logo"}/>
			</div>
			<div className={"navBar"}>
				<Link to={"/"}>
					<Button className={"btn"} variant="text">HELP</Button></Link>
				<Button className={"btn"} onClick={handleClickOpen} variant="text">LOG IN</Button>
			</div>

			<Dialog open={open} sx={{backdropFilter: "blur"}} onClose={handleClickClose}>
				<DialogTitle sx={{fontSize: "20", textAlign: "center"}}>REGISTER</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="UserName"
							type="text"
							fullWidth
							variant="standard"
						/>

						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Phone Number"
							type="tel"
							fullWidth
							variant="standard"
						/>

						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Password"
							type="password"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Re-enter Password"
							type="password"
							fullWidth
							variant="standard"
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button className={"btn"} sx={{background: "green", borderRadius: "10px"}} variant="contained">LOG
						IN</Button>
					<Button className={"btn"} variant="contained" onClick={handleClickClose}>REGISTER</Button>
				</DialogActions>
			</Dialog>

		</div>
	)
}

