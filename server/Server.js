const express = require( 'express' )
const app = express()
const mongoose = require( 'mongoose' )
const dotenv = require( 'dotenv' )
const helmet = require( 'helmet' )
const morgan = require( 'morgan' )
const cors = require( 'cors' )
const userRoutes = require( './routes/userRouter' )
const authRoutes = require( './routes/auth.route' )
const adminRoutes = require( './routes/admin.route' )
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
app.get( "/", (req, res) => {
	res.json( {message: "Welcome to  application."} );
} );
app.use( `/admin`, adminRoutes )
app.use( `/api/user`, userRoutes )
app.use( `/api/auth`, authRoutes )
app.use( notFound )
app.use( errorHandler )


app.listen( 8000, () => console.log( "Server is running at port 8080" ) )
