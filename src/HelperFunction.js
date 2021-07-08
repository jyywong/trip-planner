const parseMilitaryTime = (milTime) => {};

export const timelineStateComparer = (timelineState, timeOnly, timeDetails, timeDetailsSuggestions) => {
	if (timelineState === 'TIMELINE_ONLY') {
		return timeOnly;
	} else if (timelineState === 'TIMELINE_DETAILS') {
		return timeDetails;
	} else if (timelineState === 'TIMELINE_DETAILS_SUGGESTIONS') {
		return timeDetailsSuggestions;
	}
};

export const displayOnlyIfTimelineStateIsNotTimelineOnly = (timelineState) => {
	return timelineState === 'TIMELINE_ONLY' ? 'none' : 'flex';
};

export const displayOnlyIfTimelineStateIsTimelineDetailsSuggestions = (timelineState) => {
	return timelineState === 'TIMELINE_DETAILS_SUGGESTIONS' ? 'flex' : 'none';
};
