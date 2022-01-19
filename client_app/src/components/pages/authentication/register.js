import React, {useState} from 'react'
import {Button, Grid, Paper, TextField, Typography} from '@mui/material'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import Snackbar from '@mui/material/Snackbar'
import * as Yup from 'yup'
import axios from "axios";
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef( function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
} );

const Register = () => {
	const [ open, setOpen ] = React.useState( false );
	const [ error, setError ] = useState( " " );
	const [ success, setSuccess ] = useState( " " );

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


	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen( false );
	};

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

	const onSubmit = async (values, props) => {
		const response = await axios.post( "http://localhost:8000/api/user/register", values )
			.catch( (err) => {
				setError( err.response.data.message );
				setOpen( true )
				console.log( err )
			} );
		if (response) {

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
							<Grid align='center'>
								<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
									<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
										{error}
									</Alert>
								</Snackbar>
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
