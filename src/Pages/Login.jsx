import React from 'react';
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
const Login = () => {
	const classes = useStyles();
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
								label="Email"
								fullWidth
							/>
							<TextField
								variant="outlined"
								className={classes.mediumBottomMargin}
								label="Password"
								fullWidth
							/>
							<Button
								variant="contained"
								className={classes.smallBottomMargin}
								color="primary"
								size="large"
								fullWidth
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

export default Login;
