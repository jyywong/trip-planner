import React, { useState } from 'react';
import { Box, TextField, Button, Tabs, Tab } from '@material-ui/core';
import NewStopDetailsTextBox from './NewStopDetailsTextBox';
import NewStopLocationSelector from './NewStopLocationSelector';

const NewDetailBody = ({ createNewStop, formValues, setFormValues, collapseTimeline }) => {
	const [ tabValue, setTabValue ] = useState(0);
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};
	return (
		<React.Fragment>
			<Box display={collapseTimeline ? 'flex' : 'none'} width="100%" justifyContent="center">
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label="Details" />
					<Tab label="Location" />
				</Tabs>
			</Box>
			{tabValue === 0 ? (
				<NewStopDetailsTextBox
					collapseTimeline={collapseTimeline}
					formValues={formValues}
					setFormValues={setFormValues}
				/>
			) : (
				<NewStopLocationSelector
					formValues={formValues}
					setFormValues={setFormValues}
					collapseTimeline={collapseTimeline}
				/>
			)}
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				padding={3}
				width="100%"
				flexGrow="1"
				justifyContent="flex-end"
				alignItems="flex-end"
			>
				<Button variant="outlined" color="primary" size="large" onClick={createNewStop}>
					Create
				</Button>
				<Box ml={2}>
					<Button variant="outlined" color="secondary" size="large">
						Cancel
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewDetailBody;
