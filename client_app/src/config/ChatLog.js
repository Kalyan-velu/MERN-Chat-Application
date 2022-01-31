export const getSender = (loggedUser, users) => {
	console.log( users[0].username )
	return users[0]._id === loggedUser._id ? users[1].username : users[0].username;

}
