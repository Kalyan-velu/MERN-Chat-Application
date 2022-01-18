import React from 'react'
import {Button, Grid, Paper, TextField, Typography} from '@mui/material'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'

const Register = () => {
	const gridStyle = {
		display: "grid",
		justifyContent: "center",
	}
	const paperStyle = {
		backgroundColor: "#d6dbee",
		padding: '0 15px 40px 15px',
		borderRadius: "10px",
		width: "inherit"
	}
	const styleField = {
		padding: '5px 5px 5px 5px',
	}
	const btnStyle = {
		color: "#0072E5",
		display: "center",
		marginTop: 10,
		width: "50%"
	}

	const phoneRegExp = /^[1-9]{2}[0-9]{8}/
	const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

	const initialValues = {
		username: '',
		phoneNumber: '',
		password: '',
		confirmPassword: ''
	}

	const validationSchema = Yup.object().shape( {
		username: Yup.string()
			.required( "Required" ),
		phoneNumber: Yup.string()
			.matches( phoneRegExp, "Enter valid Phone number" )
			.required( "Required" ),
		password: Yup.string().min( 6, "Minimum characters should be 6" )
			.matches( passwordRegExp, "Password must have one upper, lower case, number, special symbol" )
			.required( 'Required' ),
		confirmPassword: Yup.string().oneOf( [ Yup.ref( 'password' ) ], "Password not matches" ).required( 'Required' )
	} )
	const onSubmit = (values, props) => {
		console.log( alert( JSON.stringify( values ), null, 2 ) )
		props.resetForm()
	}
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
								       margin={"dense"}
								       padding={"dense"}
								       name='username'
								       label='Username'
								       fullWidth
								       error={props.errors.username && props.touched.username}
								       helperText={<ErrorMessage name='name'/>} required/>

								<Field as={TextField}
								       margin={"dense"}
								       padding={"dense"}
								       name="phoneNumber"
								       label='Phone Number'
								       fullWidth
								       error={props.errors.phoneNumber && props.touched.phoneNumber}
								       helperText={<ErrorMessage name='phoneNumber'/>}
								       required/>

								<Field as={TextField}
								       margin={"dense"}
								       padding={"dense"}
								       name='password'
								       label='Password'
								       type='password'
								       fullWidth
								       error={props.errors.password && props.touched.password}
								       helperText={
									       <ErrorMessage name='password'/>}
								       required/>

								<Field as={TextField}
								       margin={"dense"}
								       padding={"dense"}
								       name='confirmPassword'
								       label='Confirm Password'
								       type='password'
								       fullWidth
								       error={props.errors.confirmPassword && props.touched.confirmPassword}
								       helperText={<ErrorMessage name='confirmPassword'/>}
								       required/>
							</div>
							<Grid align='center'>
								<Typography
									variant='caption'
									color="secondary"
								>Fill the form to create an account
								</Typography>
							</Grid>
						</Paper>
						<div style={{
							display: "flex",
							justifyContent: "center",
							padding: "10px"
						}}>
							<Button
								type='submit'
								style={btnStyle}
								variant='outlined'
							>
								Register
							</Button>
						</div>
					</Form>
				)}
			</Formik>

		</Grid>
	)
}

export default Register;
