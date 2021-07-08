import React from 'react';
import { Typography, Box, Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
const SavedDetailBody = ({ timelineState, selectedItem, classes, stop }) => {
	return (
		<React.Fragment>
			<Box display="flex" flexBasis="100%" flexDirection="column" justifyContent="space-between" padding={4}>
				<Typography
					className={timelineState === 'TIMELINE_DETAILS' ? classes.display : classes.noDisplay}
					variant="body1"
				>
					{selectedItem !== 0 && stop.details.body}
				</Typography>
				<Box alignSelf="flex-end">
					<AvatarGroup max={4} spacing="small">
						<Avatar>OP</Avatar>
						<Avatar>OP</Avatar>
						<Avatar>OP</Avatar>
						<Avatar>OP</Avatar>
						<Avatar>OP</Avatar>
					</AvatarGroup>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SavedDetailBody;
