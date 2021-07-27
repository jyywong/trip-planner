import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
const initialState = { user: null, accessToken: null, refreshToken: null };

export const authState = createSlice({
	name: 'authState',
	initialState,
	reducers: {
		setCredentials: (state, { payload }) => {
			state.user = jwt_decode(payload.refresh).user_id;
			state.accessToken = payload.access;
			state.refreshToken = payload.refresh;
		},
		refreshToken: (state, { payload }) => {
			state.accessToken = payload.access;
		},
		loggedOut: (state) => {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
		}
	}
});

export const { setCredentials, refreshToken, loggedOut } = authState.actions;

export default authState.reducer;
