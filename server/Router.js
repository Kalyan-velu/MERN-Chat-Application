const express = require( 'express' )
const router = express.Router()
const bcrypt = require( 'bcrypt' )
const registerTemplateCopy = require( './Registration' )

router.post( "/register", async (request, response) => {


	const registeredUser = new registerTemplateCopy( {
		userName: request.body.userName,
		phoneNumber: request.body.phoneNumber,
		passWord: request.body.passWord
	} )
	registeredUser.save()
		.then( data => {
			response.json( data )
		} ).catch( error => {
		response.json( error )
	} )
} )

module.exports = router
