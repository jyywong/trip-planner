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
	tagTypes: [ 'trips', 'tripEvents', 'tripEvent', 'eventIdeas', 'alternatives' ],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: 'token',
				method: 'POST',
				body: credentials
			})
		}),
		createInvitation: builder.mutation({
			query: ({ tripID, email }) => ({
				url: `create_member_invite`,
				method: 'POST',
				body: { tripID, inviteeEmail: email }
			})
		}),
		getUserInvites: builder.query({
			query: () => 'user_invites'
		}),
		updateInvite: builder.mutation({
			query: ({ inviteID, action }) => ({
				url: `single_invite/${inviteID}`,
				method: 'PATCH',
				body: { status: action }
			})
		}),
		getTrips: builder.query({
			query: () => 'trips',
			providesTags: [ 'trips' ]
		}),
		getATrip: builder.query({
			query: (tripID) => `trip/${tripID}`
		}),
		createTrip: builder.mutation({
			query: (newTrip) => ({
				url: 'trips',
				method: 'POST',
				body: newTrip
			}),
			invalidatesTags: [ 'trips' ]
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
			}),
			providesTags: [ 'tripEvent' ]
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
		}),
		switchAlternative: builder.mutation({
			query: (alternativeID) => ({
				url: `event_alternative/${alternativeID}`,
				method: 'PATCH',
				body: { status: 'Added' }
			}),
			invalidatesTags: [ 'tripEvents', 'tripEvent', 'alternatives' ]
		})
	})
});

export const {
	useLoginMutation,
	useCreateInvitationMutation,
	useGetUserInvitesQuery,
	useUpdateInviteMutation,
	useGetTripsQuery,
	useGetATripQuery,
	useCreateTripMutation,
	useGetTripEventsQuery,
	useGetATripEventQuery,
	useCreateTripEventMutation,
	useGetEventIdeasQuery,
	useCreateEventIdeaQuery,
	useAddEventIdeaMutation,
	useGetAlternativesQuery,
	useCreateAlternativeMutation,
	useSwitchAlternativeMutation
} = tripPlannerApi;
