const express = require( 'express' )
const app = express()
const mongoose = require( 'mongoose' )
const dotenv = require( 'dotenv' )
const helmet = require( 'helmet' )
const morgan = require( 'morgan' )
const cors = require( 'cors' )
const userRoutes = require( './routes/users.route' )
const authRoutes = require( './routes/auth.route' )
const adminRoutes = require( './routes/admin.route' )
const bodyParser = require( "body-parser" );

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
app.use( helmet() )
app.use( morgan( "common" ) )
app.use( cors() )
app.use( `/app/users`, userRoutes )
app.use( `/app/auth`, authRoutes )
app.use( `/admin`, adminRoutes )
app.listen( 8000, () => console.log( "Server is running at port 8000" ) )
