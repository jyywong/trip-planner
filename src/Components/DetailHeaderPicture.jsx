import React from 'react';
import { Box } from '@material-ui/core';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { makeStyles } from '@material-ui/core';
import { displayOnlyIfTimelineStateIsNotTimelineOnly } from '../HelperFunction';
import { TabletMQ, TabletMidMQ } from '../HelperFunction';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles({
	whiteIcon: {
		height: '40%',
		width: '40%',
		color: 'white'
	}
});

const DetailHeaderPicture = ({ timelineState }) => {
	const tablet = useMediaQuery(TabletMQ);
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
				justifyContent="center"
				alignItems="center"
				height={tablet ? '10%' : '20%'}
				width="100%"
				bgcolor="#e4e4e4"
				borderRadius="10px 10px 0 0 "
			>
				<WallpaperIcon className={classes.whiteIcon} />
			</Box>
		</React.Fragment>
	);
};

export default DetailHeaderPicture;
