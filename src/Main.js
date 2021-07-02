import React, { useState, useRef, useEffect } from 'react';
import Welcome from './Pages/Welcome';
import NewTrip from './Pages/NewTrip';
import DetailComp from './Components/DetailComp';
import TimelineContainer from './Components/TimelineContainer';
import TimelineComp from './Components/TimelineComp';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { wrapGrid } from 'animate-css-grid';

const useStyles = makeStyles({
	whiteText: {
		color: 'white'
	}
});

function Main() {
	const gridRef = useRef(null);

	useEffect(() => {
		console.log('being updated');
		console.log(gridRef.current);
		wrapGrid(gridRef.current, { duration: 400, easing: 'easeOut' });
	}, []);
	return (
		<React.Fragment>
			{/* <Welcome /> */}
			{/* <NewTrip /> */}
			<div
				ref={gridRef}
				style={{
					display: 'grid',
					padding: '1rem',
					borderRadius: '10px',
					height: '92vh',
					width: '97vw',
					gridTemplateColumns: 'repeat(8, 1fr)'
				}}
			>
				<TimelineContainer />
				<DetailComp />
			</div>
		</React.Fragment>
	);
}

export default Main;
