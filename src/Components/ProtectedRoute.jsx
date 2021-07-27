import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isRefreshTokenValid } from '../HelperFunction';
const ProtectedRoute = ({ component: Component, ...rest }) => {
	const refreshToken = useSelector((state) => state.authState.refreshToken);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isRefreshTokenValid(refreshToken)) {
					return <Component {...props} />;
				} else {
					return <Redirect to={{ pathname: '/' }} />;
				}
			}}
		/>
	);
};

export default ProtectedRoute;
