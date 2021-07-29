import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { useGetUserDetailsQuery } from '../Services/tripPlannerBackend';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	whiteText: {
		color: 'white',
		cursor: 'pointer'
	}
});

const Dropdown = ({ handleSignOut }) => {
	const classes = useStyles();
	const userID = useSelector((state) => state.authState.user);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const { data, error, isLoading } = useGetUserDetailsQuery(userID);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<Button
				className={classes.whiteText}
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				endIcon={<ArrowDropDownIcon />}
			>
				{!isLoading && data.username}
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				anchorReference={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleSignOut}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export default Dropdown;
