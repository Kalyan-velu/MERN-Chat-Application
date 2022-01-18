const mongoose = require( 'mongoose' );
const Joi = require( "joi" );
const passwordComplexity = require( 'joi-password-complexity' )
const userSchema = new mongoose.Schema( {
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 1
		},
		phoneNumber: {
			type: String,
			required: true,
			length: 10,
		},
		password: {
			type: String,
			required: true,
			minlength: 1
		},
		pic: {
			type: String,
			default: 'https://res.cloudinary.com/dzqbzqgqw/image/upload/v1569240554/default_profile_pic_zqxqjy.png'
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
	}, {timestamps: true}
);


const User = mongoose.model( 'User', userSchema );

const validate = (data) => {
	const schema = Joi.object( {
		username: Joi.string().required().label( "Username" ),
		phoneNumber: Joi.string().required().label( "Phone Number" ),
		password: passwordComplexity().required().label( "Password" ),
	} );
	return schema.validate( data );
}

module.exports = {User, validate}
