const express = require( 'express' )
const mongoose = require( 'mongoose' )
const dotenv = require( 'dotenv' )
const helmet = require( 'helmet' )
const bodyParser = require( "body-parser" );
const morgan = require( 'morgan' )
const cors = require( 'cors' )
const userRoutes = require( './src/routes/userRouter' )
const chatRoutes = require( './src/routes/chatRouter' )
const {notFound, errorHandler} = require( "./src/middleware/errorMiddleware" );
const app = express()

dotenv.config()
//connecting MongoDb
mongoose.connect(
	process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true},
	() => {
		console.log( "Database Connected" )
	} )
//middleware
app.use( bodyParser.json() )
//to accept JSON data
app.use( express.json() )
app.use( express.urlencoded( {extended: true} ) )
app.use( helmet() )
app.use( morgan( "common" ) )
app.use( cors() )
app.options( '*', cors() );
const allowCrossDomain = function (req, res, next) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' );
	res.header( 'Access-Control-Allow-Headers', 'Content-Type' );
	next();
};
app.use( allowCrossDomain );

//routes

app.get( "/", (req, res) => {
	res.json( {message: "Welcome to  application."} );
} );
app.use( "/api/user", userRoutes )
app.use( "/api/chat", chatRoutes )

//error handlers
app.use( notFound )
app.use( errorHandler )

const PORT = process.env.PORT || 4000
app.listen( PORT, () => console.log( `Server is running at port ${PORT}` ) )
