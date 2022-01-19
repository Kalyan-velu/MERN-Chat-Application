import React, {useState} from 'react'
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [ error, setError ] = useState( null );
	const navigate = useNavigate();
	const gridStyle = {
		display: "grid",
		justifyContent: "center",
	}
	const paperStyle = {
		backgroundColor: "#d6dbee",
		borderRadius: "10px",
		padding: '0 15px 40px 15px',
		width: "inherit"
	}
	const styleField = {
		padding: '5px'
	}
	const btnStyle = {
		color: "#0072E5",
		display: "center",
		marginTop: 10,
		width: "50%"
	}

	const phoneRegExp = /^[1-9]{0}[0-9]{9}/
	const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
	const initialValues = {
		phoneNumber: '',
		password: ''
	}

	const validationSchema = Yup.object().shape( {
		phoneNumber: Yup.string()
			.matches( phoneRegExp, "Enter Valid Phone number" )
			.required( 'Required' ),
		password: Yup.string().min( 6, "Minimum characters should be 6" )
			.matches( passwordRegExp, "Password must have  one upper,lower case,number,special character" )
			.required( "Required" )
	} )

	const onSubmit = async (values, props) => {
		setError( false )
		console.log( alert( JSON.stringify( values ), null, 2 ) )
		const response = await axios.post( "http://localhost:8000/api/user/login", values )
			.catch( (err) => {
				console.log( err );
			} );
		if (response) {
			navigate( './chats' )
			props.resetForm()
		}
	};


	return (
		<Grid style={gridStyle}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}>
				{(props) => (
					<Form noValidate>
						<Paper
							elevation={0}
							style={paperStyle}>
							<div style={styleField}>
								<Field as={TextField}
								       padding={"dense"}
								       margin={"dense"}
								       name='phoneNumber'
								       label='Enter Phone Number'
								       fullWidth
								       error={props.errors.phoneNumber && props.touched.phoneNumber}
								       helperText={<ErrorMessage name='Phone Number'/>} required/>
								<Field as={TextField}
								       padding={"dense"}
								       margin={"dense"}
								       name='password'
								       label='Enter Password'
								       fullWidth
								       error={props.errors.password && props.touched.password}
								       helperText={<ErrorMessage name='Password'/>} required/>
							</div>
							<Grid align='center'>
								<Typography
									variant='caption'
									color={"secondary"}
								>Fill the form to login into your account
								</Typography>

							</Grid>
						</Paper>
						<div style={{
							display: "flex",
							justifyContent: "center",
							padding: "20px"
						}}>
							<Button
								type='submit'
								style={btnStyle}
								variant='outlined'
							>
								login
							</Button>
						</div>
					</Form>)}
			</Formik>

		</Grid>
	)
}

export default Login
