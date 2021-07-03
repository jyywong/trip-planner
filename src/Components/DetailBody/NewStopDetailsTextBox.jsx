import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
	root: {
		width: '100%',
		'& .MuiInputBase-root': {
			height: '75%'
		}
	}
});
const NewStopDetailsTextBox = ({ collapseTimeline, formValues, setFormValues }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				padding={2}
				width="100%"
				height="35%"
			>
				<TextField
					className={classes.root}
					multiline
					label="Details"
					rows={10}
					variant="outlined"
					value={formValues.details}
					onChange={(e) => setFormValues({ ...formValues, details: e.target.value })}
				/>
			</Box>
		</React.Fragment>
	);
};

export default NewStopDetailsTextBox;
