import React from 'react';
import { Box, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	lineHeightOverride: {
		lineHeight: '1'
	},
	avatarOrange: {
		backgroundColor: 'orange'
	}
}));
const SuggestionHeader = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box boxSizing="border-box" display="flex" alignItems="center">
				<Box marginRight={1}>
					<Avatar className={classes.avatarOrange}>OP</Avatar>
				</Box>

				<Box display="flex" height="100%" justifyContent="space-between" flexDirection="column">
					<Typography className={classes.lineHeightOverride} variant="h6">
						Original Poster
					</Typography>
					<Typography className={classes.lineHeightOverride} variant="body2">
						originalposter@email.com
					</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionHeader;
