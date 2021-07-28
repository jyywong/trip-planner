import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Slices/AuthSlice';
import { useLoginMutation } from '../Services/tripPlannerBackend';
import { useSignupMutation } from '../Services/tripPlannerBackend';
import { Card, Button, Typography, CardContent, Box, TextField } from '@material-ui/core';
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
const SignUp = () => {
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			password2: ''
		},
		onSubmit: (values) => {
			console.log(values);
		}
	});

	const { enqueueSnackbar } = useSnackbar();
	const [ login, { isLoading } ] = useLoginMutation();
	const [ signup, { isSuccess, isError } ] = useSignupMutation();
	const dispatch = useDispatch();
	const classes = useStyles();
	const { push } = useHistory();
	const [ formValues, setFormValues ] = useState({ username: '', email: '', password: '', password2: '' });
	const handleSubmit = () => {
		signup(formValues).then((response) => console.log(response));
	};
	const attemptLogin = async () => {
		try {
			const user = await login(formValues).unwrap();
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
								label="Username"
								fullWidth
								value={formik.username}
								onChange={formik.handleChange}
							/>
							<TextField
								variant="outlined"
								className={classes.mediumBottomMargin}
								id="email"
								label="Email"
								type="email"
								fullWidth
								value={formik.email}
								onChange={formik.handleChange}
							/>
							<TextField
								variant="outlined"
								className={classes.mediumBottomMargin}
								id="password"
								label="Password"
								type="password"
								fullWidth
								value={formik.password}
								onChange={formik.handleChange}
							/>
							<TextField
								variant="outlined"
								className={classes.mediumBottomMargin}
								id="password2"
								label="Confirm Password"
								type="password"
								fullWidth
								value={formik.password2}
								onChange={formik.handleChange}
							/>
							<Button
								variant="contained"
								className={classes.smallBottomMargin}
								color="primary"
								size="large"
								fullWidth
								onClick={handleSubmit}
							>
								SIGN IN
							</Button>
							<Typography className={classes.noBottomMargin} variant="subtitle1">
								Don't have an account? Sign up!
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</React.Fragment>
	);
};

export default SignUp;
