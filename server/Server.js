const express = require( 'express' )
const app = express()
const mongoose = require( 'mongoose' )
const dotenv = require( 'dotenv' )
const helmet = require( 'helmet' )
const morgan = require( 'morgan' )
const cors = require( 'cors' )
const userRoutes = require( './routes/userRouter' )
const adminRoutes = require( './routes/admin.route' )
const {chats} = require( './data/chats' )
const bodyParser = require( "body-parser" );
const {notFound, errorHandler} = require( "./middleware/errorMiddleware" );

dotenv.config()
//connecting MongoDb
mongoose.connect(
	process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true},
	() => {
		console.log( "Database Connected" )
	} )
//middleware
app.use( bodyParser.json() )
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
app.get( "/", (req, res) => {
	res.json( {message: "Welcome to  application."} );
} );
app.use( `/admin`, adminRoutes )
app.use( `/api/user`, userRoutes )
app.get( "/api/chat",
	(req, res) => {
		res.send( chats )
	} )

app.get( "/api/chat/:id",
	(req, res) => {
		console.log( req.params.id );
		const singleChat = chats.find( chats => chats._id === req.params.id )
		res.send( singleChat )
	} )
app.use( notFound )
app.use( errorHandler )

const PORT = process.env.PORT || 8000
app.listen( PORT, () => console.log( `Server is running at port ${PORT}` ) )
