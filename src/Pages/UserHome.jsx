import React, { useState } from 'react';
import { Box, Button, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
const UserHome = () => {
	const cardList = [ 'pink', 'orangered', 'blue', 'green', 'purple', 'black', 'grey' ];
	const [ shownCards, setShownCards ] = useState([ 1, 2, 3 ]);
	const handleClickLeft = () => {
		setShownCards((current) => current.map((cardIndex) => cardIndex - 1));
		console.log(shownCards);
	};
	const handleClickRight = () => {
		setShownCards((current) => current.map((cardIndex) => cardIndex + 1));
		console.log(shownCards);
	};

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
							<NotificationsIcon />

							<Box display="flex" alignItems="center" marginLeft={4}>
								<PersonIcon />
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
				<div
					style={{
						flexGrow: '1',
						display: 'grid',
						gridTemplateColumns: 'repeat(6, 1fr)',
						padding: '2rem 8rem'
					}}
				>
					<Box display="flex" alignItems="center" justifyContent="center" gridColumn="1/3">
						<Box
							boxSizing="border-box"
							flexBasis="70%"
							height="70%"
							display="flex"
							boxShadow="3"
							bgcolor="pink"
						/>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="space-evenly" gridColumn="3/5">
						<Button onClick={handleClickLeft}>
							<Typography variant="body1">&larr;</Typography>
						</Button>
						<Box
							boxSizing="border-box"
							flexBasis="80%"
							height="80%"
							display="flex"
							boxShadow="8"
							bgcolor="orangered"
						>
							Hello
						</Box>
						<Button onClick={handleClickRight}>
							<Typography variant="body1">&rarr;</Typography>
						</Button>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="center" gridColumn="5/7">
						<Box
							boxSizing="border-box"
							flexBasis="70%"
							height="70%"
							display="flex"
							boxShadow="3"
							bgcolor="blue"
						/>
					</Box>
				</div>
			</Box>
		</React.Fragment>
	);
};

export default UserHome;
