import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Button, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
const UserHome = () => {
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
		controlsLeft.start({
			x: -300,
			opacity: 0,
			transitionEnd: {
				x: 0,
				opacity: 1
			}
		});
		controlsMiddle
			.start({
				x: '-34rem',
				scale: 0.875,

				transitionEnd: {
					scale: 1,
					x: 0
				}
			})
			.then(() => {
				console.log('hi');
				setShownCards((current) => current.map((cardIndex) => cardIndex + 1));
			});
		controlsRight.start({
			x: '-38rem',
			scale: 1.142,
			transitionEnd: {
				scale: 1,
				x: 0
			}
		});
		controlsNext.start({
			x: 0,
			opacity: 1,
			transitionEnd: {
				x: 1000,
				opacity: 0
			}
		});
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
						boxSizing="border-box"
						gridColumn="1/3"
						height="70%"
						width="70%"
						display="flex"
						boxShadow="3"
						bgcolor={cardList[shownCards[0]]}
						component={motion.div}
						animate={controlsLeft}
					>
						{cardList[shownCards[0]]}
					</Box>

					<Box
						boxSizing="border-box"
						gridColumn="3/5"
						height="80%"
						width="80%"
						display="flex"
						boxShadow="8"
						bgcolor={cardList[shownCards[1]]}
						component={motion.div}
						animate={controlsMiddle}
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
						gridColumn="5/7"
						gridRow="1/2"
						height="70%"
						width="70%"
						display="flex"
						boxShadow="3"
						bgcolor={cardList[shownCards[2]]}
						component={motion.div}
						animate={controlsRight}
					>
						{cardList[shownCards[2]]}
					</Box>
					<Box
						boxSizing="border-box"
						zIndex="1"
						gridColumn="5/7"
						gridRow="1/2"
						height="70%"
						width="70%"
						display="flex"
						boxShadow="3"
						bgcolor={cardList[shownCards[3]]}
						component={motion.div}
						initial={{
							x: 1000
						}}
						animate={controlsNext}
					>
						{cardList[shownCards[3]]}
					</Box>
				</motion.div>
			</Box>
		</React.Fragment>
	);
};

export default UserHome;
