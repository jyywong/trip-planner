import React from 'react';
import DetailComp from '../Components/DetailComp';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { loggedOut } from '../Slices/AuthSlice';
import TimelineContainer from '../Components/TimelineContainer';
import SuggestionsComp from '../Components/Suggestions/SuggestionsComp';
import EventIdeaContainer from '../Components/EventIdeas/EventIdeaContainer';
import { Link } from 'react-router-dom';
import { Typography, Box, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TripMembersContainer from '../Components/TripMembers/TripMembersContainer';
import { makeStyles } from '@material-ui/core';
import Dropdown from '../Components/Dropdown';

const useStyles = makeStyles({
	whiteIcon: {
		color: 'white',
		cursor: 'pointer'
	},
	whiteText: {
		color: 'white',
		textTransform: 'none'
	}
});

const EditTrip = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const handleSignOut = () => {
		dispatch(loggedOut());
		history.push('/');
	};
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box display="flex" height="100vh" width="100vw" flexDirection="column">
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" color="inherit">
							Trip Planner
						</Typography>
						<Box display="flex" alignItems="center" marginLeft="auto">
							<Button component={Link} to="/home">
								<Typography className={classes.whiteText}>Home</Typography>
							</Button>

							<Box display="flex" alignItems="center" marginLeft={4}>
								<Dropdown handleSignOut={handleSignOut} />
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
				<div
					style={{
						display: 'grid',
						padding: '1rem',
						borderRadius: '10px',
						height: '95vh',
						maxHeight: '100vh',
						minHeight: '0',
						width: '97vw',
						gridTemplateColumns: 'repeat(8, 1fr)',
						overflowX: 'hidden'
					}}
				>
					<TripMembersContainer />
					<TimelineContainer />
					<DetailComp />
					<SuggestionsComp />
					<EventIdeaContainer />
				</div>
			</Box>
		</React.Fragment>
	);
};

export default EditTrip;
