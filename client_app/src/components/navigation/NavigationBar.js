import React from 'react'
import "./NavBar.css"
import Button from "@mui/material/Button"
import Logo from './image/Logo.png'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material"


export default function NavigationBar(props) {


	const handleClickOpen = () => {
		props.setOpen( true )
	}

	function handleClickClose() {
		props.setOpen( false )
	}

	function handleUserNameChange(e) {
		props.setUsername( e.target.value )
	}

	function handlePhoneNoChange(e) {
		props.setPhoneNumber( e.target.value )
	}

	function handlePasswordChange(e) {
		props.setPassword( e.target.value )
	}

	function onSubmit(e) {
		e.preventDefault();
	}

	return (
		<div>
			<div className={"navBar-L"}>
				<div className={"Logo"}>
					<img src={Logo} alt={"LOGO"}/>
				</div>
				<div className={"navBar"}>
					{props.hasAccount ? (
							<Button className={"btn"} sx={{margin: "20px", color: "aliceBlue"}} onClick={handleClickOpen}
							        variant="outlined">LOG IN</Button>)
						: (<Button className={"btn"} sx={{margin: "20px", color: "aliceBlue"}} onClick={handleClickOpen}
						           variant="outlined">REGISTER</Button>)}
				</div>

				<Dialog className={"dialog"} open={props.open} sx={{backdropFilter: "10px blur"}}
				        onClose={handleClickClose}>
					{props.hasAccount ? (<DialogTitle sx={{fontSize: "30", textAlign: "center"}}>LOG IN</DialogTitle>)
						: (<DialogTitle sx={{fontSize: "30", textAlign: "center"}}>REGISTER</DialogTitle>)}
					<DialogContent>
						<form method={"POST"} autoComplete={"off"} onSubmit={onSubmit}>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="UserName"
								type="text"
								fullWidth
								variant="standard"
								onChange={handleUserNameChange}
								required={true}
							/>

							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Phone Number"
								type="tel"
								fullWidth
								variant="standard"
								onChange={handlePhoneNoChange}
								required={true}
							/>

							<TextField
								autoComplete="off"
								autoFocus
								margin="dense"
								id="name"
								label="Password"
								type="password"
								fullWidth
								variant="standard"
								onChange={handlePasswordChange}
								required={true}
							/>
							{props.hasAccount ? (" ")
								: (<TextField
									autoFocus
									margin="dense"
									id="name"
									label="Re-enter Password"
									type="password"
									fullWidth
									variant="standard"
									onChange={handlePasswordChange}
									required={true}
								/>)}
						</form>
					</DialogContent>
					<DialogActions>
						{props.hasAccount ? (
							<>
								<Button type="submit" sx={{background: "green", borderRadius: "10px"}}>Log In</Button>

								<Button className={"btn"} variant="text"
								        onClick={() => props.setHasAccount( !props.hasAccount )}>REGISTER</Button>

							</>
						) : (
							<>
								<Button
									className={"btn"}
									type="submit"
									sx={{
										background: "green",
										borderRadius: "10px",
										margin: "10px"
									}}
									variant="contained"
									onClick={props.register}
								>REGISTER
								</Button>
								<a onClick={() => props.setHasAccount( !props.hasAccount )}>
									<Button
										className={"btn"}
										variant="text">
										LOG IN</Button>
								</a>

							</>)}

					</DialogActions>
				</Dialog>
			</div>
		</div>
	)
}

