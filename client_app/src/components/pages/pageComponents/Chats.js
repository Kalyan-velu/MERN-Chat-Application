import React from 'react'
import {Box} from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import {Divider, List, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";


export default function MyChats() {
	return (

		<Box sx={{
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#b89de2",
			padding: 3,
			width: "20%",
			height: "85%",
			borderRadius: "10px",
			borderWidth: "1px"
		}}>
			<Box sx={
				{
					paddingBottom: 3,
					paddingInlineEnd: 3,
					fontSize: "20px",
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center"
				}
			}>
				<Typography variant={"h5"}>Recent Chat</Typography>

				<div style={{flexGrow: 2}}/>
				<Box>
					<Delete/>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					padding: 3,
					width: "100%",
					height: "100%",
					borderRadius: "lg",
					overflow: "hidden"
				}}>
				<List>
					<ListItem>
						Helo
					</ListItem>
					<Divider/>
					<ListItem>
						Helo
					</ListItem>
				</List>
			</Box>

			<Fab sx={{
				position: "sticky",
				top: 10,
				bottom: 10,
				left: 16,
			}} size="small" color="#fff" aria-label="add" varient="string">
				<AddIcon/>
			</Fab>
		</Box>
	)
}
