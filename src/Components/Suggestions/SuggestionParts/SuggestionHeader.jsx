import React from 'react';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { makeStyles } from '@material-ui/styles';

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
const SuggestionHeader = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				display="flex"
				flexWrap="wrap"
				alignItems="center"
				justifyContent="space-between"
			>
				<Box display="flex">
					<Box marginRight={1}>
						<Avatar className={classes.avatarOrange}>OP</Avatar>
					</Box>

					<Box display="flex" justifyContent="space-between" flexDirection="column">
						<Typography className={classes.lineHeightOverride} variant="h6">
							Original Poster
						</Typography>
						<Typography className={classes.lineHeightOverride} variant="body2">
							originalposter@email.com
						</Typography>
					</Box>
				</Box>

				<Box display="flex" justifyContent="center" flexGrow="1">
					<Button className={classes.buttonOverride} variant="contained" color="primary">
						<SyncAltIcon />
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionHeader;
