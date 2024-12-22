import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  data: [],
};

// Create a slice with reducers and initial state
const ProfileSlice = createSlice({
  name: 'ProfileSlice',
  initialState,
  reducers: {
    // Reducer for adding data
    addData(state: any, action: any) {
      state.data = action.payload;
    },
    removeProfile(state: any, action: any) {
      state.data = [];
    },
    // Reducer for getting data
    getData(state: any) {
      return state.data;
    },
  },
});

// Export action creators
export const { addData, getData ,removeProfile} = ProfileSlice.actions;

// Export reducer
export default ProfileSlice.reducer;
