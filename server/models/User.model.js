const mongoose = require( 'mongoose' )


const userSchema = new mongoose.Schema( {
		userName: {
			type: String,
			require: true,
			min: 3,
			max: 20,
		},
		phoneNumber: {
			type: String,
			require: true,
			max: 10,
			min: 10,
			unique: true
		},
		password: {
			type: String,
			require: true,
			min: 6
		},
		pic: {
			type: String,
			required: false,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		isAdmin: {
			type: Boolean,
		},
	},
	{timestamps: true} )

module.exports = mongoose.model( "User", userSchema )
