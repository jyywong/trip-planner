import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tripStopReducer from './Slices/TripStopSlice';
import timelineStateReducer from './Slices/TimelineStateSlice';
import UIStateReducer from './Slices/UISlice';
import suggestionReducer from './Slices/SuggestionsSlice';
import eventIdeasReducer from './Slices/EventIdeasSlice';
import authReducer from './Slices/AuthSlice';
import { tripPlannerApi } from './Services/tripPlannerBackend';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage
};

const rootReducer = combineReducers({
	timelineState: timelineStateReducer,
	suggestions: suggestionReducer,
	tripStop: tripStopReducer,
	eventIdeas: eventIdeasReducer,
	UIState: UIStateReducer,
	authState: authReducer,
	[tripPlannerApi.reducerPath]: tripPlannerApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tripPlannerApi.middleware)
});

setupListeners(store.dispatch);
