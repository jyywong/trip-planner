import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { refreshToken, loggedOut } from '../Slices/AuthSlice';
const baseQuery = fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' });

export const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery('token/refresh', api, extraOptions);
		if (refreshResult.data) {
			api.dispatch(refreshToken(refreshResult.data));
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(loggedOut());
		}
	}
};
