import React, { useEffect } from 'react';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { makeStyles } from '@material-ui/styles';
import { useSwitchAlternativeMutation } from '../../../Services/tripPlannerBackend';
import { useMediaQuery } from '@material-ui/core';
import { LMobileMQ, MLaptopMQ } from '../../../HelperFunction';
import { useGetUserDetailsQuery } from '../../../Services/tripPlannerBackend';
import { truncate } from '../../../HelperFunction';
const useStyles = makeStyles((theme) => ({
	lineHeightOverride: {
		lineHeight: '1'
	},
	avatarOrange: {
		backgroundColor: 'orange'
	},
	buttonOverride: {
		minWidth: '0',
		width: '60%'
	}
}));
const SuggestionHeader = ({ suggestion }) => {
	const lMobile = useMediaQuery(LMobileMQ);
	const mLaptop = useMediaQuery(MLaptopMQ);
	const { data, error, isLoading } = useGetUserDetailsQuery(suggestion.createdBy);
	const [ switchAlternative ] = useSwitchAlternativeMutation();
	const classes = useStyles();
	const handleSwitch = () => {
		switchAlternative(suggestion.id);
	};

	useEffect(
		() => {
			console.log(data);
			console.log(error);
		},
		[ isLoading ]
	);

	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				display="flex"
				alignItems="center"
				flexDirection={lMobile || mLaptop ? 'column' : 'row'}
				justifyContent="space-between"
			>
				<Box display="flex">
					<Box marginRight={1}>
						<Avatar className={classes.avatarOrange} />
					</Box>

					<Box display="flex" justifyContent="space-between" flexDirection="column">
						<Typography className={classes.lineHeightOverride} variant="h6">
							{!isLoading && data.username}
						</Typography>
						<Typography className={classes.lineHeightOverride} variant="body2">
							{!isLoading && data.email}
						</Typography>
					</Box>
				</Box>

				<Box
					display="flex"
					justifyContent="center"
					width="100%"
					flexGrow="1"
					marginTop={lMobile || mLaptop ? 2 : 0}
				>
					<Button
						className={classes.buttonOverride}
						onClick={handleSwitch}
						variant="contained"
						color="primary"
						fullWidth
					>
						<SyncAltIcon />
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionHeader;
