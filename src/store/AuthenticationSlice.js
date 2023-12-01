import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user authentication slice
const initialState = {
    status: false, // Authentication status (false by default)
    userData: null, // User data (null by default)
};

// Create a Redux slice for user authentication
const authenticationSlice = createSlice({
    name: "userAuthentication",
    initialState,
    reducers: {
        // Reducer for handling user login action
        login: (state, action) => {
            state.status = true; // Set authentication status to true
            state.userData = action.payload.userData; // Update user data with the payload data
        },
        // Reducer for handling user logout action
        logout: (state) => {
            state.status = false; // Set authentication status to false
            state.userData = null; // Clear user data
        },
    },
});

// Export login and logout action creators
export const { login, logout } = authenticationSlice.actions;

// Export the user authentication reducer
export default authenticationSlice.reducer;
