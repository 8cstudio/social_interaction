import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullName: '',
    nickName: '',
    email: '',
    phoneNumber: ''
}

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        getUser: (state, action) => {
            const { fullName, nickName, email, phoneNumber } = action.payload;
            state.fullName = fullName
            state.nickName = nickName
            state.email = email
            state.phoneNumber = phoneNumber
        }
    },
})

export const { getUser } = UserSlice.actions
export default UserSlice.reducer

