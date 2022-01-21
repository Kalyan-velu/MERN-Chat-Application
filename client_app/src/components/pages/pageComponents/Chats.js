import React from 'react'
import {Box} from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import {ButtonBase, Divider, List, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";


export default function MyChats() {
	return (

		<Box p={3} sx={{
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#d97dff",
			width: "25%",
			height: "100%",
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

				<div style={{flexGrow: 1}}/>
				<Box>
					<Delete/>
				</Box>
			</Box>
			<Box
				sx={{
					width: "100%",
					height: "800px",
					overflow: "hidden",
				}}>
				<List sx={{
					display: "flex",
					flexDirection: "column"
				}}>
					<ListItem>
						<ButtonBase
							sx={{
								display: "flex",
								justifyContent: 'left',
								font: "18px",
								broderRadius: "10px",
								backgroundColor: "#111",
								color: "white",
								width: "100%",
								height: "40px"
							}}
						>
							<Typography varient={"h3"}>hu</Typography>
							<Typography varient={"h4"}>gyg</Typography>
						</ButtonBase>
						<Divider/>
					</ListItem>
					) )}
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
