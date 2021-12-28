import React from 'react'
import "./NavBar.css"
import Logo from "./Frame 10.png"
import Button from "@mui/material/Button";


const NavigationBar = () => {

	return (
		<div className={"navBar-L"}>
			<div className={"Logo"}>
				<img id={"img"} src={Logo} alt={"Logo"}/>
			</div>
			<div className={"navBar"}>
				<Button className={"btn"} variant="text">HELP</Button>
				<Button className={"btn"} variant="text">LOG IN</Button>

			</div>
		</div>
	)
}
export default NavigationBar
