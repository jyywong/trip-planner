import React from 'react';
import { Box, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	greenThumb: {
		color: '#008000'
	},
	redThumb: {
		color: '#B50101'
	}
}));

const SuggestionVotes = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Box display="flex" flexBasis="20%" paddingX={4} justifyContent="space-evenly" marginTop={2}>
				<ThumbUpIcon className={classes.greenThumb} fontSize="large" />
				<Typography variant="h5">3</Typography>
				<ThumbDownIcon className={classes.redThumb} fontSize="large" />
				<Typography variant="h5">2</Typography>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionVotes;
