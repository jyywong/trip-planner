import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
	noDisplay: {
		display: 'none'
	},
	display: {
		display: 'inherit'
	}
});
const SavedDetailBody = ({ collapseTimeline }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				padding={4}
				width="100%"
				height="65%"
			>
				<Typography className={collapseTimeline ? classes.display : classes.noDisplay} variant="body1">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam fuga vel perferendis rerum.
					Voluptatem, iusto labore? Incidunt, nemo magnam, numquam ad laboriosam eum, nisi qui mollitia atque
					minima deserunt voluptatibus! Maxime fuga incidunt sequi at dolorum vitae eveniet ipsum libero?
				</Typography>
			</Box>
		</React.Fragment>
	);
};

export default SavedDetailBody;
