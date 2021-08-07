import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { mediaQueryComparer, TabletMQ, LMobileMQ } from '../HelperFunction';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	welcomeButtonContainer: {
		display: 'flex',
		justifyContent: 'space-evenly',
		width: '30%'
	},
	welcomeButtonContainerTablet: {
		display: 'flex',
		justifyContent: 'space-evenly',
		width: '50%'
	},
	welcomeButtonContainerLM: {
		display: 'flex',
		justifyContent: 'space-evenly',
		// alignItems: 'center',
		// flexDirection: 'column',
		width: '100%'
	}
});

const Welcome = () => {
	const tablet = useMediaQuery(TabletMQ);
	const LMobile = useMediaQuery(LMobileMQ);
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				display="flex"
				width="100vw"
				height="100vh"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Typography align="center" variant="h1">
					Trip Planner
				</Typography>
				<div
					className={mediaQueryComparer(
						{ tabletMatch: tablet, LMobileMatch: LMobile },
						{
							defaultMQ: classes.welcomeButtonContainer,
							tabletMQ: classes.welcomeButtonContainerTablet,
							LMobileMQ: classes.welcomeButtonContainerLM
						}
					)}
				>
					<Box width="40%">
						<Button variant="contained" color="default" mr="auto" component={Link} to="/signup" fullWidth>
							Sign Up
						</Button>
					</Box>

					<Box width="40%">
						<Button variant="contained" color="primary" component={Link} to="/login" fullWidth>
							Log In
						</Button>
					</Box>
				</div>
			</Box>
		</React.Fragment>
	);
};

export default Welcome;
