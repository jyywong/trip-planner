import { configureStore } from '@reduxjs/toolkit';
import tripStopReducer from './Slices/TripStopSlice';
import timelineStateReducer from './Slices/TimelineStateSlice';
import UIStateReducer from './Slices/UISlice';
import suggestionReducer from './Slices/SuggestionsSlice';
import eventIdeasReducer from './Slices/EventIdeasSlice';
export default configureStore({
	reducer: {
		timelineState: timelineStateReducer,
		suggestions: suggestionReducer,
		tripStop: tripStopReducer,
		eventIdeas: eventIdeasReducer,
		UIState: UIStateReducer
	}
});
