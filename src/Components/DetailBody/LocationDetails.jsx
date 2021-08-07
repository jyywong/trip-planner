import React from 'react';
import { Typography, Box, Link, Chip, Button } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles';
import { TabletMidMQ } from '../../HelperFunction';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginRight: theme.spacing(2),
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(0.5)
		}
	},
	biggerChips: {
		fontSize: '1rem',
		textTransform: 'capitalize'
	}
}));

const LocationDetails = ({ placeDetails }) => {
	const { name, business_status, formatted_address, icon, types, url } = placeDetails;
	const tabletMid = useMediaQuery(TabletMidMQ);
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box display="flex" flexDirection={tabletMid ? 'column' : 'row'} justifyContent="space-between">
				<Typography variant="h4"> {name}</Typography>
				<Box>
					<Button variant="contained" color="primary" href={url} target="_blank" endIcon={<LaunchIcon />}>
						Google Maps
					</Button>
				</Box>
			</Box>

			{/* <Box className={classes.root} display="flex" flexWrap="wrap">
				{types.map((type) => <Chip key={types.indexOf(type)} className={classes.biggerChips} label={type} />)}
			</Box> */}
			{/* <Typography variant="body1">Check it out in Google Maps!</Typography>
				<Link variant="body1">{url}</Link> */}
		</React.Fragment>
	);
};

export default LocationDetails;
