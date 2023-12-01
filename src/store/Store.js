import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./AuthenticationSlice";

// Configure the Redux store using configureStore from @reduxjs/toolkit
const store = configureStore({
    // Define reducers for the store
    reducer: {
        userAuthentication: AuthenticationSlice, // Include the userAuthentication reducer
    },
});

// Export the configured Redux store
export default store;
