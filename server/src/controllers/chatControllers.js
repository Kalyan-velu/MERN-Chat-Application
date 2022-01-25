const expressAsyncHandler = require( "express-async-handler" );
const Chat = require( "../models/chatModel" );
const User = require( "../models/userModel" );


const accessChats = async (request, response) => {
	const {userId} = request.body.userId;

	if (!userId) {
		console.log( "UserId params not sent in request" )
		return response.sendStatus( 400 )
	}

	var isChat = await Chat.find( {
		isGroupChat: false,
		$and: [
			{users: {$elemMatch: {$eq: request.user._id}}},
			{users: {$elemMatch: {$eq: userId}}},
		]
	} ).populate( "users", "-password" ).populate( "latestMessage" );

	isChat = await User.populate( isChat, {
		path: "latestMessage.sender",
		select: "username phoneNumber pic",
	} )
	if (isChat.length > 0) {
		response.send( isChat[0] )
	} else {
		var chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [ request.user._id, userId ],
		}
		try {
			const createdChat = await Chat.create( chatData );
			const FullChat = await Chat.findOne( {_id: createdChat._id} ).populate( "users", "-password" )
			response.send( FullChat ).status( 200 )
		} catch (e) {
			response.status( 400 );
			throw new Error( e.message )
		}
	}
}

const fetchChats = async (request, response) => {
	try {
		Chat.find(
				{users: {$elemMatch: {$eq: request.user._id}}} )
			.populate( "users", "-password" )
			.populate( "groupAdmin", "-password" )
			.populate( "latestMessage" )
			.sort( {updatedAt: -1} )
			.then( async (results) => {
				results = await User.populate( results,
					{
						path: "latestMessage.sender",
						select: " username pic phoneNumber"
					} );
				response.status( 200 ).send( results )
			} )
	} catch (e) {
		response.status( 400 );
		throw new Error( e.message )
	}
}

const createGroupChat = async (request, response) => {
	if (!request.body.users || !request.body.username) {
		return response.status( 400 ).send( {message: "Please fill all the fields"} )
	}

	var users = JSON.parse( request.body.users );
	if (users.length < 2) {
		return response.status( 400 )
			.send( "Add More than two users" )
	}
	users.push( request.user );

	try {
		const groupChat = await Chat.create(
			{
				chatName: request.body.username,
				users: users,
				isGroupChat: true,
				groupAdmin: request.user,
			}
		)
		const fullGroupChat = await Chat.findOne( {
			_id: groupChat._id
		} ).populate( "users", "-password" )
			.populate( "groupAdmin", "-password" )
		response.status( 200 ).json( fullGroupChat );
	} catch (e) {
		response.status( 400 )
		throw new Error( e.message )
	}
}

const renameGroupChat = async (request, response) => {
	const {chatId, chatName} = request.body

	const updatedChat = await Chat.findByIdAndUpdate(
			chatId, {
				chatName
			}, {
				new: true,
			}
		)
		.populate( "users", "-password" )
		.populate( "groupAdmin", "-password" );
	if (!updatedChat) {
		response.status( 404 )
		throw new Error( "Chat Not Found" )
	} else {
		response.json( updatedChat )
	}
}

const addToGroup = async (request, response) => {
	const {chatId, userId} = request.body

	const added = await Chat.findByIdAndUpdate( chatId, {
			$push: {
				users: userId
			}
		}, {new: true} )
		.populate( "users", "-password" )
		.populate( "groupAdmin", "-password" )
	if (!added) {
		response.status( 404 );
		throw new Error( "Chat Not Found" )
	} else {
		response.json( added )
	}
}

const removeFromGroup = async (request, response) => {
	const {chatId, userId} = request.body

	const added = await Chat.findByIdAndUpdate( chatId, {
			$push: {
				users: userId
			}
		}, {new: true} )
		.populate( "users", "-password" )
		.populate( "groupAdmin", "-password" )
	if (!added) {
		response.status( 404 );
		throw new Error( "Chat Not Found" )
	} else {
		response.json( added )
	}
}
module.exports = {
	accessChats: expressAsyncHandler( accessChats ),
	fetchChats: expressAsyncHandler( fetchChats ),
	createGroupChat: expressAsyncHandler( createGroupChat ),
	renameGroupChat: expressAsyncHandler( renameGroupChat ),
	addToGroup: expressAsyncHandler( addToGroup ),
	removeFromGroup: expressAsyncHandler( removeFromGroup )
}
