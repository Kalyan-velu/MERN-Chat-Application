import React from 'react'
import "./NavBar.css"
import Button from "@mui/material/Button"
import Logo from './image/Logo.png'

export default function NavigationBar(props) {


	return (
		<div>
			<div className={"navBar-L"}>
				<div className={"Logo"}>
					<img src={Logo} alt={"LOGO"}/>
				</div>
				<div className={"navBar"}>
					{props.hasAccount ? (
							<Button className={"btn"} sx={{margin: "20px", color: "aliceBlue"}} variant="outlined">LOG
								IN</Button>)
						: (<Button className={"btn"} sx={{margin: "20px", color: "aliceBlue"}}
						           variant="outlined">REGISTER</Button>)}
				</div>
			</div>

		</div>
	)
}

