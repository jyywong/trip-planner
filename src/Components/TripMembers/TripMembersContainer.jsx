import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { timelineModeSelector } from '../../Slices/TimelineStateSlice';
import MembersTable from './MembersTable';
import DeleteMemberDialog from './DeleteMemberDialog';
import { useMediaQuery } from '@material-ui/core';
import { TabletMQ } from '../../HelperFunction';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { returnToTimelineOnly } from '../../Slices/TimelineStateSlice';
const useStyles = makeStyles((theme) => ({
	expandGrid: {
		gridColumn: '1/5',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	fullGrid: {
		gridColumn: '1/9',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	avatarOverride: {
		height: '4rem',
		width: '4rem'
	},
	whiteText: {
		color: 'white'
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
	const dispatch = useDispatch();
	const tablet = useMediaQuery(TabletMQ);
	const [ showForm, setShowForm ] = useState(false);
	const [ showDialog, setShowDialog ] = useState(false);
	const [ chosenMember, setChosenMember ] = useState(0);
	const timelineState = useSelector(timelineModeSelector);

	const classes = useStyles();

	const handleAdd = () => {
		setShowForm(true);
	};
	return (
		<AnimatePresence>
			{timelineState === 'MEMBERS_TIMELINE' && (
				<React.Fragment>
					<motion.div
						className={tablet ? classes.fullGrid : classes.expandGrid}
						animate={{ x: 0 }}
						initial={{
							x: -1200
						}}
						exit={{
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
							<Box display="flex" boxSizing="border-box" bgcolor="#A895B7" width="100%" padding={2}>
								<Box display="flex" width="100%" alignSelf="flex-end" marginLeft="2%">
									<Typography className={classes.whiteText} variant="h4">
										Trip Members
									</Typography>
									<Box alignSelf="flex-end" marginLeft="auto">
										<Button variant="outlined" onClick={handleAdd}>
											<AddIcon />
										</Button>
									</Box>
								</Box>
							</Box>
							<MembersTable
								showForm={showForm}
								setShowForm={setShowForm}
								setShowDialog={setShowDialog}
								setChosenMember={setChosenMember}
							/>
							<Box>
								<Button
									endIcon={<ChevronRightIcon fontSize="large" />}
									onClick={() => {
										dispatch(returnToTimelineOnly());
									}}
								>
									Timeline
								</Button>
							</Box>
						</Box>
					</motion.div>
					<DeleteMemberDialog
						showDialog={showDialog}
						setShowDialog={setShowDialog}
						chosenMember={chosenMember}
					/>
				</React.Fragment>
			)}
		</AnimatePresence>
	);
};

export default TripMembersContainer;
