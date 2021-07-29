import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Slices/AuthSlice';
import { useLoginMutation } from '../Services/tripPlannerBackend';
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
const Login = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const [ login, { isLoading } ] = useLoginMutation();
	const [ formValues, setFormValues ] = useState({ username: '', password: '' });
	const classes = useStyles();
	const handleSubmit = async () => {
		try {
			const user = await login(formValues).unwrap();
			dispatch(setCredentials(user));
			push('/home');
		} catch (error) {
			console.log(error);
		}
	};
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
								<Typography variant="h4"> Log In</Typography>
							</Box>
							<TextField
								variant="outlined"
								className={classes.mediumBottomMargin}
								label="Username"
								fullWidth
								value={formValues.username}
								onChange={(e) => {
									setFormValues((current) => ({ ...current, username: e.target.value }));
								}}
							/>
							<TextField
								variant="outlined"
								className={classes.mediumBottomMargin}
								label="Password"
								type="password"
								fullWidth
								value={formValues.password}
								onChange={(e) => {
									setFormValues((current) => ({ ...current, password: e.target.value }));
								}}
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
								Don't have an account?
								<Link component={RouterLink} to="/signup">
									Sign up!
								</Link>
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</React.Fragment>
	);
};

export default Login;
