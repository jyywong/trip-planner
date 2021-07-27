import React from 'react';
import DetailComp from '../Components/DetailComp';
import TimelineContainer from '../Components/TimelineContainer';
import SuggestionsComp from '../Components/Suggestions/SuggestionsComp';
import EventIdeaContainer from '../Components/EventIdeas/EventIdeaContainer';
import { Link } from 'react-router-dom';
import { Typography, Box, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TripMembersContainer from '../Components/TripMembers/TripMembersContainer';

const EditTrip = () => {
	return (
		<React.Fragment>
			<Box display="flex" height="100vh" width="100vw" flexDirection="column">
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit">
							Trip Planner
						</Typography>
						<Box display="flex" alignItems="center" marginLeft="auto">
							<Button component={Link} to="/home">
								<Typography>Home</Typography>
							</Button>

							<Box display="flex" alignItems="center" marginLeft={4}>
								<PersonIcon />
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
