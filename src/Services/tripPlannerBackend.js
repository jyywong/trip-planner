import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { refreshToken, loggedOut } from '../Slices/AuthSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://127.0.0.1:8000/api',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().authState.accessToken;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	}
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	const { getState } = api;
	if (result.error && result.error.status === 401) {
		if (getState().authState.refreshToken) {
			const refreshResult = await baseQuery(
				{ url: 'token/refresh', method: 'POST', body: { refresh: getState().authState.refreshToken } },
				api,
				extraOptions
			);
			if (refreshResult.data) {
				api.dispatch(refreshToken(refreshResult.data));
				result = await baseQuery(args, api, extraOptions);
			}
		} else {
			api.dispatch(loggedOut());
		}
	}
	return result;
};

export const tripPlannerApi = createApi({
	reducerPath: 'tripPlannerApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: [ 'tripEvents', 'eventIdeas', 'alternatives' ],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: 'token',
				method: 'POST',
				body: credentials
			})
		}),
		getTrips: builder.query({
			query: () => 'trips'
		}),
		getATrip: builder.query({
			query: (tripID) => `trip/${tripID}`
		}),
		createTrip: builder.query({
			query: (newTrip) => ({
				url: 'trips',
				method: 'POST',
				body: newTrip
			})
		}),
		getTripEvents: builder.query({
			query: (tripID) => ({
				url: `trip_events/${tripID}`
			}),
			providesTags: [ 'tripEvents' ]
		}),
		getATripEvent: builder.query({
			query: (eventID) => ({
				url: `trip_event/${eventID}`
			})
		}),
		createTripEvent: builder.mutation({
			query: ({ tripID, newEvent }) => ({
				url: `trip_events/${tripID}`,
				method: 'POST',
				body: newEvent
			}),
			invalidatesTags: [ 'tripEvents' ]
		}),
		getEventIdeas: builder.query({
			query: (tripID) => ({
				url: `event_ideas/${tripID}`
			}),
			providesTags: [ 'eventIdeas' ]
		}),
		createEventIdea: builder.query({
			query: ({ tripID, newEventIdea }) => ({
				url: `event_ideas/${tripID}`,
				method: 'POST',
				body: newEventIdea
			}),
			invalidatesTags: [ 'eventIdeas' ]
		}),
		addEventIdea: builder.mutation({
			query: (eventIdeaID) => ({
				url: `event_idea/${eventIdeaID}`,
				method: 'PATCH',
				body: {
					status: 'Added'
				}
			}),
			invalidatesTags: [ 'eventIdeas', 'tripEvents' ]
		}),
		getAlternatives: builder.query({
			query: (eventID) => ({
				url: `event_alternatives/${eventID}`
			}),
			providesTags: [ 'alternatives' ]
		}),
		createAlternative: builder.mutation({
			query: ({ eventID, newAlternative }) => ({
				url: `event_alternatives/${eventID}`,
				method: 'POST',
				body: newAlternative
			}),
			invalidatesTags: [ 'alternatives' ]
		})
	})
});

export const {
	useLoginMutation,
	useGetTripsQuery,
	useGetATripQuery,
	useGetTripEventsQuery,
	useGetATripEventQuery,
	useCreateTripEventMutation,
	useGetEventIdeasQuery,
	useCreateEventIdeaQuery,
	useAddEventIdeaMutation,
	useGetAlternativesQuery,
	useCreateAlternativeMutation
} = tripPlannerApi;
