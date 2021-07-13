import React from 'react';
import { Box, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	greenThumb: {
		color: '#008000'
	},
	redThumb: {
		color: '#B50101'
	}
});
const EventIdeaVoteButtons = ({ votes }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexBasis="15%"
				flexDirection="column"
				bgcolor="#f2f2f2"
			>
				<Typography variant="h6">{votes.upvotes}</Typography>
				<Box marginBottom={1}>
					<ThumbUpIcon className={classes.greenThumb} />
				</Box>

				<ThumbDownIcon className={classes.redThumb} />
				<Typography variant="h6">{votes.downvotes}</Typography>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaVoteButtons;
