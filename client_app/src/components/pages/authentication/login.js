import React from 'react'
import {Card, CardActions, CardContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function Authentication(props) {


	function handleUserNameChange(e) {
		props.setUsername( e.target.value )
	}

	function handlePhoneNoChange(e) {
		props.setPhoneNumber( e.target.value )
	}

	function handlePasswordChange(e) {
		props.setPassword( e.target.value )
	}

	function handlePasswordReChange(e) {
		props.setPasswordRe( e.target.value )
	}

	function onSubmit(e) {
		e.preventDefault();
	}

	return (
		<div>
			<Card className={"dialog"} open={props.open} sx={{backdropFilter: "10px blur"}}>
				{props.hasAccount ? (<DialogTitle sx={{fontSize: "30", textAlign: "center"}}>LOG IN</DialogTitle>)
					: (<DialogTitle sx={{fontSize: "30", textAlign: "center"}}>REGISTER</DialogTitle>)}
				<CardContent>
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
								onChange={handlePasswordReChange}
								required={true}
							/>)}
					</form>
				</CardContent>
				<CardActions>
					{props.hasAccount ? (
						<>
							<Button type="submit" onClick={props.handleSubmitL}
							        sx={{background: "green", borderRadius: "10px"}}>Log In</Button>

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
								onClick={props.handleSubmit}
							>REGISTER
							</Button>
							<a href={"#"} onClick={() => props.setHasAccount( !props.hasAccount )}>
								<Button
									className={"btn"}
									variant="text">
									LOG IN</Button>
							</a>

						</>)}

				</CardActions>
			</Card>
		</div>
	)
}
