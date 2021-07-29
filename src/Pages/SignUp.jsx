import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Slices/AuthSlice';
import { useLoginMutation } from '../Services/tripPlannerBackend';
import { useSignupMutation } from '../Services/tripPlannerBackend';
import { Card, Button, Typography, CardContent, Box, TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles({
	cardOverride: {
		width: '30%'
	},
	cardContentOverride: {
		height: '100%'
	},
	mediumBottomMargin: {
		marginBottom: '1.5rem'
	},
	smallBottomMargin: {
		marginBottom: '1rem'
	}
});

const SignUpSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, 'Username must be more than 2 characters!')
		.max(30, 'Username must not be longer than 30 characters!')
		.nullable()
		.required('A valid username is required!'),
	email: Yup.string().email('Invalid email').required('A valid email is required!'),
	password: Yup.string().min(6, 'Password must be more than 6 characters!').required('A valid password is required!'),
	password2: Yup.string().oneOf([ Yup.ref('password'), null ], 'Passwords must match!')
});

const SignUp = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [ login, { isLoading } ] = useLoginMutation();
	const [ signup, { isSuccess, isError } ] = useSignupMutation();
	const dispatch = useDispatch();
	const classes = useStyles();
	const { push } = useHistory();
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			password2: ''
		},
		validationSchema: SignUpSchema,
		onSubmit: (values) => {
			signup(values).then((response) => console.log(response));
		}
	});
	const attemptLogin = async () => {
		try {
			const user = await login(formik.values).unwrap();
			dispatch(setCredentials(user));
			push('/home');
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfully created a new account! Now signing you in.', { variant: 'success' });
				setTimeout(attemptLogin(), 1000);
			} else if (isError) {
				enqueueSnackbar('Unable to create account', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);
	return (
		<React.Fragment>
			<Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
				<Card className={classes.cardOverride} raised>
					<CardContent className={classes.cardContentOverride}>
						<form onSubmit={formik.handleSubmit} noValidate>
							<Box
								boxSizing="border-box"
								height="100%"
								width="100%"
								display="flex"
								flexDirection="column"
								alignItems="center"
								padding={1}
							>
								<Box display="flex" marginBottom={2} flexDirection="column" alignItems="center">
									<LockIcon />
									<Typography variant="h4"> Sign Up </Typography>
								</Box>
								<TextField
									variant="outlined"
									className={classes.mediumBottomMargin}
									id="username"
									name="username"
									label="Username"
									fullWidth
									{...formik.getFieldProps('username')}
									error={formik.touched.username && formik.errors.username && true}
									helperText={
										formik.touched.username && formik.errors.username ? formik.errors.username : ''
									}
								/>
								<TextField
									variant="outlined"
									className={classes.mediumBottomMargin}
									id="email"
									name="email"
									label="Email"
									type="email"
									fullWidth
									{...formik.getFieldProps('email')}
									error={formik.touched.email && formik.errors.email && true}
									helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
								/>
								<TextField
									variant="outlined"
									className={classes.mediumBottomMargin}
									id="password"
									name="password"
									label="Password"
									type="password"
									fullWidth
									{...formik.getFieldProps('password')}
									error={formik.touched.password && formik.errors.password && true}
									helperText={
										formik.touched.password && formik.errors.password ? formik.errors.password : ''
									}
								/>
								<TextField
									variant="outlined"
									className={classes.mediumBottomMargin}
									id="password2"
									name="password2"
									label="Confirm Password"
									type="password"
									fullWidth
									{...formik.getFieldProps('password2')}
									error={formik.touched.password2 && formik.errors.password2 && true}
									helperText={
										formik.touched.password2 && formik.errors.password2 ? (
											formik.errors.password2
										) : (
											''
										)
									}
								/>
								<Button
									variant="contained"
									className={classes.smallBottomMargin}
									color="primary"
									size="large"
									fullWidth
									type="submit"
								>
									SIGN UP
								</Button>
								<Typography className={classes.noBottomMargin} variant="subtitle1">
									Already have an account?
									<Link component={RouterLink} to="/login">
										Log in!
									</Link>
								</Typography>
							</Box>
						</form>
					</CardContent>
				</Card>
			</Box>
		</React.Fragment>
	);
};

export default SignUp;
