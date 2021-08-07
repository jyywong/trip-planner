import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/styles';
import { upvoteEventIdea, downvoteEventIdea } from '../../Slices/EventIdeasSlice';
import { useMediaQuery } from '@material-ui/core';
import { TabletMidMQ } from '../../HelperFunction';
const useStyles = makeStyles({
	buttonOverride: {
		padding: '6px'
	},
	greenThumb: {
		color: '#008000'
	},
	redThumb: {
		color: '#B50101'
	}
});

const EventIdeaVoteButtons = ({ id, votes }) => {
	const tabletMid = useMediaQuery(TabletMidMQ);
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleUpvote = () => {
		dispatch(upvoteEventIdea({ id }));
	};
	const handleDownvote = () => {
		dispatch(downvoteEventIdea({ id }));
	};
	return (
		<React.Fragment>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				borderRadius={tabletMid ? '0 0 10px 10px' : '0 0 10px 0'}
				flexDirection={tabletMid ? 'row' : 'column'}
				bgcolor="#f2f2f2"
			>
				<Typography variant="h6">{votes.upvotes}</Typography>

				<IconButton className={classes.buttonOverride} onClick={handleUpvote}>
					<ThumbUpIcon className={classes.greenThumb} />
				</IconButton>

				<IconButton className={classes.buttonOverride} onClick={handleDownvote}>
					<ThumbDownIcon className={classes.redThumb} />
				</IconButton>
				<Typography variant="h6">{votes.downvotes}</Typography>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaVoteButtons;
