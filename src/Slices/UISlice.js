import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mode: 'Add'
};

export const UIState = createSlice({
	name: 'UI Variables',
	initialState,
	reducers: {
		changeModeToDetail: (state) => {
			state.mode = 'Detail';
		},
		changeModeToAdd: (state) => {
			state.mode = 'Add';
		}
	}
});

export const { changeModeToAdd, changeModeToDetail } = UIState.actions;

export default UIState.reducer;
