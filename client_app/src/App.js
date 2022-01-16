import * as React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./components/pages/Homepage";


function App() {
	const [ open, setOpen ] = useState( false );
	const [ userName, setUserName ] = useState( " " );
	const [ phoneNumber, setPhoneNumber ] = useState( " " );
	const [ passWord, setPassWord ] = useState( " " );
	const [ passwordRe, setPasswordRe ] = useState( " " );
	const [ hasAccount, setHasAccount ] = useState( false );

	const handleSubmitR = () => {
		axios.post( `http://localhost:8000/app/auth/register`, {
			'userName': userName,
			'phoneNumber': phoneNumber,
			'passWord': passWord
		} ).then( r => {
				console.log( r )
			} )
			.catch( err => {
				console.log( err )
			} )
	}

	const handleSubmitL = () => {
		axios.post( `http://localhost:8080/app/login`, {
			'phoneNumber': phoneNumber,
			'passWord': passWord
		} ).then( r => {
				console.log( r )
			} )
			.catch( err => {
				console.log( err )
			} )
	}

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={
						<HomePage
						/>}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App
