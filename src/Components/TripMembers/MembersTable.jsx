import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import MemberListItem from './MemberListItem';
import NewMemberForm from './NewMemberForm';
import { useGetATripQuery } from '../../Services/tripPlannerBackend';
import { timelineSelectedTrip } from '../../Slices/TimelineStateSlice';
import { makeStyles } from '@material-ui/styles';
import { Box, TableContainer, Table, TableBody } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	expandGrid: {
		gridColumn: '1/5',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},

	avatarOverride: {
		height: '4rem',
		width: '4rem'
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

const MembersTable = ({ showForm, setShowForm, setShowDialog, setChosenMember }) => {
	const classes = useStyles();
	const selectedTrip = useSelector(timelineSelectedTrip);

	const { data, error, isLoading } = useGetATripQuery(selectedTrip);
	return (
		<React.Fragment>
			<Box
				className={classes.root}
				overflow="auto"
				display="flex"
				flexGrow="1"
				width="100%"
				flexDirection="column"
				component={motion.div}
				layout
			>
				<AnimatePresence>
					{showForm ? <NewMemberForm setShowForm={setShowForm} /> : <React.Fragment />}
				</AnimatePresence>
				<TableContainer component={motion.div} layout>
					<Table>
						<TableBody>
							{!isLoading &&
								!error &&
								data.members.map((user) => (
									<MemberListItem
										key={user.id}
										memberList={data}
										user={user}
										setShowDialog={setShowDialog}
										setChosenMember={setChosenMember}
									/>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</React.Fragment>
	);
};

export default MembersTable;
