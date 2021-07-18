import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
	expandGrid: {
		gridColumn: '1/5',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	fabOverride: {
		alignSelf: 'flex-start',
		marginTop: '-2.5rem',
		marginLeft: '15%',
		height: '5rem',
		width: '5rem'
	},
	root: {
		'&::-webkit-scrollbar': {
			width: '16px'
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#a3a3a3',
			borderRadius: '10px',
			border: '5px solid #f2f2f2'
		}
	}
}));
const TripMembersContainer = () => {
	const timelineState = useSelector((state) => state.timelineState);

	const classes = useStyles();

	return (
		<AnimatePresence>
			{timelineState === 'MEMBERS_TIMELINE' && (
				<React.Fragment>
					<motion.div
						className={classes.expandGrid}
						animate={{ x: 0 }}
						initial={{
							x: -1200
						}}
						transition={{
							type: 'spring',
							stiffness: 50,
							mass: 0.8
						}}
						layout
					>
						<Box
							display="flex"
							flexGrow="1"
							boxSizing="border-box"
							flexDirection="column"
							alignItems="center"
							borderRadius="10px"
							boxShadow={3}
							overflow="hidden"
							m={1}
							minHeight="0"
							component={motion.div}
							layout
						>
							<Box boxSizing="border-box" flexBasis="20%" bgcolor="#A895B7" width="100%" padding={2}>
								Hello
							</Box>
							<Fab className={classes.fabOverride} size="large">
								<AddIcon />
							</Fab>
						</Box>
					</motion.div>
				</React.Fragment>
			)}
		</AnimatePresence>
	);
};

export default TripMembersContainer;
