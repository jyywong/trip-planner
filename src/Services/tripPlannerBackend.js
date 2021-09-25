import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { refreshToken, loggedOut } from '../Slices/AuthSlice';

// const baseUrl = 'http://127.0.0.1:8000/api';
const baseUrl = 'https://aqueous-harbor-15603.herokuapp.com/api';

const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
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
	tagTypes: [ 'trip', 'trips', 'tripEvents', 'tripEvent', 'eventIdeas', 'alternatives' ],
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (newUser) => ({
				url: 'signup',
				method: 'POST',
				body: newUser
			})
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: 'token',
				method: 'POST',
				body: credentials
			})
		}),
		getUserDetails: builder.query({
			query: (userID) => `user_details/${userID}`
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
			query: (tripID) => `trip/${tripID}`,
			providesTags: [ 'trip' ]
		}),
		removeMember: builder.mutation({
			query: ({ tripID, newMemberList }) => ({
				url: `remove_from_trip/${tripID}`,
				method: 'PATCH',
				body: newMemberList
			}),
			invalidatesTags: [ 'trip' ]
		}),
		deleteTrip: builder.mutation({
			query: (tripID) => ({
				url: `trip/${tripID}`,
				method: 'DELETE'
			}),
			invalidatesTags: [ 'trips' ]
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
		deleteTripEvent: builder.mutation({
			query: (eventID) => ({
				url: `trip_event/${eventID}`,
				method: 'DELETE'
			}),
			invalidatesTags: [ 'tripEvents', 'tripEvent' ]
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
		upvoteEventIdea: builder.mutation({
			query: ({ eventIdeaID, upvote }) => ({
				url: `event_idea/${eventIdeaID}`,
				method: 'PATCH',
				body: {
					upvotes: upvote
				}
			}),
			invalidatesTags: [ 'eventIdeas', 'tripEvents' ]
		}),
		downvoteEventIdea: builder.mutation({
			query: ({ eventIdeaID, downvote }) => ({
				url: `event_idea/${eventIdeaID}`,
				method: 'PATCH',
				body: {
					downvotes: downvote
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
		upvoteAlternative: builder.mutation({
			query: ({ alternativeID, upvote }) => ({
				url: `event_alternative/${alternativeID}`,
				method: 'PATCH',
				body: { upvotes: upvote }
			}),
			invalidatesTags: [ 'alternatives' ]
		}),
		downvoteAlternative: builder.mutation({
			query: ({ alternativeID, downvote }) => ({
				url: `event_alternative/${alternativeID}`,
				method: 'PATCH',
				body: { downvotes: downvote }
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
	useSignupMutation,
	useLoginMutation,
	useGetUserDetailsQuery,
	useCreateInvitationMutation,
	useGetUserInvitesQuery,
	useUpdateInviteMutation,
	useGetTripsQuery,
	useGetATripQuery,
	useRemoveMemberMutation,
	useDeleteTripMutation,
	useCreateTripMutation,
	useGetTripEventsQuery,
	useGetATripEventQuery,
	useDeleteTripEventMutation,
	useCreateTripEventMutation,
	useGetEventIdeasQuery,
	useCreateEventIdeaQuery,
	useAddEventIdeaMutation,
	useUpvoteEventIdeaMutation,
	useDownvoteEventIdeaMutation,
	useGetAlternativesQuery,
	useCreateAlternativeMutation,
	useUpvoteAlternativeMutation,
	useDownvoteAlternativeMutation,
	useSwitchAlternativeMutation
} = tripPlannerApi;
