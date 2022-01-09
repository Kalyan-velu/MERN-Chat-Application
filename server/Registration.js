const mongoose = require( 'mongoose' )
const registerTemplate = new mongoose.Schema( {
	userName: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	passWord: {
		type: String,
		required: true
	}
} )
module.exports = mongoose.model( 'accounts', registerTemplate )
