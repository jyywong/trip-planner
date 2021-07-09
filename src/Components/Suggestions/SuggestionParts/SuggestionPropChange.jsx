import React from 'react';
import { Box, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	crossedOutOverride: {
		textDecoration: 'line-through'
	}
}));

const SuggestionPropChange = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Box display="flex" flexDirection="column" marginTop={1}>
				<Typography variant="overline">Proposed: </Typography>
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography className={classes.crossedOutOverride} variant="body1">
						McDonalds
					</Typography>
					<ArrowDownwardIcon />
					<Typography variant="body1">Burger King</Typography>
				</Box>
				<Typography variant="overline">Reason: </Typography>
				<Box paddingX={3}>
					<Typography variant="body2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, veniam!
					</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionPropChange;
