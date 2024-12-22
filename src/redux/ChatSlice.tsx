import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  data: [],
};

// Create a slice with reducers and initial state
const ChatFriendSlice = createSlice({
  name: 'FriendSlice',
  initialState,
  reducers: {
    // Reducer for adding data
    addChatFriend(state: any, action: any) {
      
      state.data = action.payload;
    },
    removeChatFriend(state: any, action: any) {
      state.data = [];
    },
    // Reducer for getting data
    getChatFriend(state: any) {
      return state.data;
    },
  },
});
// Export action creators
export const { addChatFriend, getChatFriend , removeChatFriend} = ChatFriendSlice.actions;
// Export reducer
export default ChatFriendSlice.reducer;
