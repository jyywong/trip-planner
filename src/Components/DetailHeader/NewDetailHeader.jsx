import React from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { makeStyles } from '@material-ui/core';
import DetailHeaderBase from './DetailHeaderBase';

const useStyles = makeStyles({
	root: {
		'& .MuiInputLabel-formControl': {
			top: '-1rem',
			left: '0',
			position: 'absolute',
			transform: 'translate(0 , 40px) scale(1)'
		},
		'& .MuiInputLabel-shrink': {
			transform: 'translate(0, 1.5px) scale(0.75)'
		},
		'& .MuiInputBase-root': {
			fontSize: '2rem'
		},
		'& .MuiFormLabel-root': {
			fontSize: '2rem'
		}
	}
});

const NewDetailHeader = ({ formValues, setFormValues, collapseTimeline }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<DetailHeaderBase collapseTimeline={collapseTimeline}>
				{/* <Typography variant="h2">Lunch</Typography> */}
				<form noValidate>
					<Box display="flex" alignItems="flex-end">
						<TextField
							className={classes.root}
							label="Event name"
							value={formValues.name}
							onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
						/>
						<TextField
							type="time"
							label="Arrive at"
							// defaultValue="12:00"
							InputLabelProps={{ shrink: true }}
							value={formValues.time}
							onChange={(e) => setFormValues({ ...formValues, time: e.target.value })}
						/>
					</Box>
				</form>

				<Box display="flex" alignItems="center" ml="auto">
					<EditLocationIcon />
					<Typography variant="subtitle1">Location</Typography>
				</Box>
			</DetailHeaderBase>
		</React.Fragment>
	);
};

export default NewDetailHeader;
