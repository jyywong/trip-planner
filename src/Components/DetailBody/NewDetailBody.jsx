import React from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		width: '100%',
		'& .MuiInputBase-root': {
			height: '75%'
		}
	}
});
const NewDetailBody = ({ collapseTimeline }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				paddingX={4}
				padding={2}
				width="100%"
				height="50%"
			>
				<TextField className={classes.root} multiline label="Details" rows={14} variant="outlined" />
			</Box>
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				padding={3}
				width="100%"
				height="15%"
				justifyContent="flex-end"
				alignItems="flex-end"
			>
				<Button variant="outlined" color="primary" size="large">
					Create
				</Button>
				<Box ml={2}>
					<Button variant="outlined" color="secondary" size="large">
						Cancel
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewDetailBody;
