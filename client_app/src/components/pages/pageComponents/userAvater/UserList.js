import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";

const UserListItem = ({user, handleFunction}) => {

	return (
		<Box
			onClick={handleFunction}
			sx={{
				cursor: "pointer",
				background: "#b07fce",
				'&hover': {
					background: "#38B2AC",
					color: "#fff"
				},
				width: "100%",
				display: "flex",
				alignItems: "center",
				color: "black",
				px: "3",
				py: "2",
				mb: "2",
				borderRadius: "5px"
			}}>
			<Avatar
				margin={2}
				size={"sm"}
				name={user.username}
				src={user.pic}/>
			<Box
				margin={"sm"}>
				<Typography varient={"h4"}><b>{user.username}</b></Typography>
				<Typography varient={"h3"}>{user.phoneNumber}</Typography>
			</Box>
		</Box>
	)
}
export default UserListItem
