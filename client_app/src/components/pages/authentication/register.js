import React, {useState} from 'react';
import {Card, CardActions, CardContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

function Register(props) {
	const [ userName, setUserName ] = useState( " " );
	const [ phoneNumber, setPhoneNumber ] = useState( " " );
	const [ password, setPassword ] = useState( " " );
	const [ passWordRe, setPasswordRe ] = useState( " " );


	function handleUserNameChange(e) {
		setUserName( e.target.value )
	}

	function handlePhoneNoChange(e) {
		setPhoneNumber( e.target.value )
	}

	function handlePasswordChange(e) {
		setPassword( e.target.value )
	}

	function handlePasswordReChange(e) {
		setPasswordRe( e.target.value )
	}

	function onSubmit(e) {
		e.preventDefault();
	}

	const handleSubmit = () => {
		axios.post( `http://localhost:8000/app/auth/register`, {
			'userName': userName,
			'phoneNumber': phoneNumber,
			'password': password
		} ).then( r => {
				console.log( r )
			} )
			.catch( err => {
				console.log( err )
			} )
	}

	return (
		<div>
			<Card className={"dialog"} open={props.open} sx={{backdropFilter: "10px blur"}}>
				<CardContent>
					<form method={"POST"} autoComplete={"off"} onSubmit={onSubmit}>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="UserName"
							type="text"
							fullWidth
							variant="outlined"
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
							variant="outlined"
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
							variant="outlined"
							onChange={handlePasswordChange}
							required={true}
						/>

						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Re-enter Password"
							type="password"
							fullWidth
							variant="outlined"
							onChange={handlePasswordReChange}
							required={true}
						/>
					</form>
				</CardContent>
				<CardActions sx={{display: "flex", justifyContent: "center"}}>
					<Button type="submit" onClick={handleSubmit}
					        sx={{height: "30px", borderRadius: "10px"}}>Sign Up</Button>
				</CardActions>
			</Card>

		</div>
	);
}

export default Register;
