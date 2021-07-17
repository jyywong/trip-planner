import React, { useState } from 'react';
import { Box, Button, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { motion, useAnimation } from 'framer-motion';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
const useStyles = makeStyles({
	leftBoxNA: {
		gridColumn: '1/3'
	},
	leftBoxA: {
		gridColumn: '1/1'
	}
});
const UserHome2 = () => {
	const classes = useStyles();
	const [ animating, setAnimating ] = useState(false);
	const controlsLeft = useAnimation();
	const controlsMiddle = useAnimation();
	const controlsRight = useAnimation();
	const controlsNext = useAnimation();
	const cardList = [ 'pink', 'orangered', 'blue', 'green', 'purple', 'black', 'grey' ];
	const [ shownCards, setShownCards ] = useState([ 1, 2, 3, 4 ]);
	const handleClickLeft = () => {
		setShownCards((current) => current.map((cardIndex) => cardIndex - 1));
		console.log(shownCards);
	};
	const handleClickRight = () => {
		setAnimating(true);
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
				<motion.div
					style={{
						flexGrow: '1',
						display: 'grid',
						alignItems: 'center',
						justifyItems: 'center',
						gridTemplateColumns: 'repeat(6, 1fr)',
						padding: '2rem 8rem'
					}}
					layout
				>
					<Box
						className={animating ? classes.leftBoxA : classes.leftBoxNA}
						boxSizing="border-box"
						// gridColumn={animating ? '1/1' : '1/3'}
						gridRow="1/2"
						height="70%"
						width="70%"
						display="flex"
						boxShadow="3"
						bgcolor={cardList[shownCards[0]]}
						component={motion.div}
						layout
					>
						{cardList[shownCards[0]]}
					</Box>

					<Box
						boxSizing="border-box"
						gridColumn={animating ? '1/3' : '3/5'}
						gridRow="1/2"
						height="80%"
						width="80%"
						display="flex"
						boxShadow="8"
						bgcolor={cardList[shownCards[1]]}
						component={motion.div}
						layout
					>
						<Button onClick={handleClickLeft}>
							<Typography variant="body1">&larr;</Typography>
						</Button>

						<Button onClick={handleClickRight}>
							<Typography variant="body1">&rarr;</Typography>
						</Button>

						{cardList[shownCards[1]]}
					</Box>

					<Box
						boxSizing="border-box"
						zIndex="2"
						gridColumn={animating ? '3/5' : '5/7'}
						gridRow="1/2"
						height="70%"
						width="70%"
						display="flex"
						boxShadow="3"
						bgcolor={cardList[shownCards[2]]}
						component={motion.div}
						layout
					>
						{cardList[shownCards[2]]}
					</Box>
					<Box
						boxSizing="border-box"
						zIndex="1"
						gridColumn={animating ? '5/7' : '7/7'}
						gridRow="1/2"
						visibility={animating ? 'visible' : 'hidden'}
						height="70%"
						width="70%"
						display="flex"
						boxShadow="3"
						bgcolor={cardList[shownCards[3]]}
						component={motion.div}
						layout
					>
						{cardList[shownCards[3]]}
					</Box>
				</motion.div>
			</Box>
		</React.Fragment>
	);
};

export default UserHome2;
