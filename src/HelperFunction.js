import { setHours, setMinutes, parseISO } from 'date-fns';
import jwt_decode from 'jwt-decode';

const parseMilitaryTime = (milTime) => {};

export const timelineStateComparer = (
	timelineState,
	timeOnly,
	timeDetails,
	timeDetailsSuggestions,
	timeEventIdeas,
	timeMembers
) => {
	if (timelineState === 'TIMELINE_ONLY') {
		return timeOnly;
	} else if (timelineState === 'TIMELINE_DETAILS') {
		return timeDetails;
	} else if (timelineState === 'TIMELINE_DETAILS_SUGGESTIONS') {
		return timeDetailsSuggestions;
	} else if (timelineState === 'TIMELINE_EVENT_IDEAS') {
		return timeEventIdeas;
	} else if (timelineState === 'MEMBERS_TIMELINE') {
		return timeMembers;
	}
};

export const displayOnlyIfTimelineStateIsNotTimelineOnly = (timelineState) => {
	return timelineState === 'TIMELINE_ONLY' || timelineState === 'TIMELINE_EVENT_IDEAS' ? 'none' : 'flex';
};

export const displayOnlyIfTimelineStateIsTimelineDetailsSuggestions = (timelineState) => {
	return timelineState === 'TIMELINE_DETAILS_SUGGESTIONS' ? 'flex' : 'none';
};

export const convertToDate = (today, time) => {
	const hoursRE = /^\d+/;
	const minsRE = /\d+$/;
	const hours = time.match(hoursRE);
	const mins = time.match(minsRE);
	const finalDate = setMinutes(setHours(parseISO(today), hours), mins).toISOString();
	return finalDate;
};

export const truncate = (input, charLimit) =>
	input.length > charLimit ? `${input.substring(0, charLimit)}...` : input;

export const isRefreshTokenValid = (refreshToken) => {
	if (refreshToken) {
		const now = Math.ceil(Date.now() / 1000);
		if (jwt_decode(refreshToken).exp > now) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};
export const mediaQueryComparer = (
	{ tabletMatch, LMobileMatch, SMobileMatch },
	{ tabletMQ, LMobileMQ, SMobileMQ, defaultMQ }
) => {
	if (SMobileMatch) {
		return SMobileMQ;
	} else if (LMobileMatch) {
		return LMobileMQ;
	} else if (tabletMatch) {
		return tabletMQ;
	} else {
		return defaultMQ;
	}
};
export const MLaptopMQ = '(max-width:1300px)';
export const SLaptopMQ = '(max-width:1100px) and (min-width: 768px)';
export const TabletMQ = '(max-width:768px)';
export const TabletMidMQ = '(max-width:550px)';
export const LMobileMQ = '(max-width:450px)';
export const SMobileMQ = '(max-width:375px)';
