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
