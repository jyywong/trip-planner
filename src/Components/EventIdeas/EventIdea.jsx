import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Divider, Chip } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
	whiteText: {
		color: 'white'
	},
	greenThumb: {
		color: '#008000'
	},
	redThumb: {
		color: '#B50101'
	}
});

const EventIdea = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				flexBasis="30%"
				margin={3}
				width="80%"
				borderRadius="10px"
				boxShadow={4}
				display="flex"
				flexDirection="column"
				bgcolor="white"
			>
				<Box
					display="flex"
					paddingLeft={2}
					paddingTop={1}
					bgcolor="#A895B7"
					flexBasis="20%"
					borderRadius="10px 10px 0 0"
				>
					<Box alignSelf="flex-end">
						<Typography className={classes.whiteText} variant="h4">
							Event Name
						</Typography>
					</Box>
				</Box>
				<Box display="flex" flexBasis="70%">
					<Box marginTop={1} display="flex" justifyContent="space-evenly">
						<Box flexBasis="40%">
							<Typography variant="body1">Details: </Typography>
							<Box padding={1}>
								<Typography variant="body2">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, cupiditate
									exercitationem? Sunt dolore iure sed.
								</Typography>
							</Box>
						</Box>
						<Divider orientation="vertical" flexItem />
						<Box flexBasis="40%">
							<Typography variant="body1">Location: </Typography>
							<Box padding={1}>
								<Typography variant="h5">McDonald's</Typography>
								<Typography variant="body1">5995 Mavis Rd, Mississauga, ON L5R 3T7, Canada</Typography>
								<Box marginTop={1}>
									<Chip label="hello" />
									<Chip label="hello" />
									<Chip label="hello" />
								</Box>
							</Box>
						</Box>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexBasis="15%"
						flexDirection="column"
						bgcolor="#f2f2f2"
					>
						<Typography variant="h6">5</Typography>
						<Box marginBottom={1}>
							<ThumbUpIcon className={classes.greenThumb} />
						</Box>

						<ThumbDownIcon className={classes.redThumb} />
						<Typography variant="h6">5</Typography>
					</Box>
				</Box>
				<Box display="flex" flexGrow="1" bgcolor="#c4c4c4" borderRadius="0 0 10px 10px" overflow="hidden">
					<Box flexBasis="40%" bgcolor="green" />
					<Box flexBasis="60%" bgcolor="#B50101" />
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default EventIdea;
