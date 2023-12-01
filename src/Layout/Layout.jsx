import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components/componentExporter";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import appwriteAuthenticationService from "../appwrite/appwriteUserFunction";
import { login, logout } from "../store/AuthenticationSlice";

function Layout() {
  // State to manage loading state while fetching user data
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect to fetch user data when the component mounts
  useEffect(() => {
    // Fetch current user account data from Appwrite
    appwriteAuthenticationService
      .getCurrentUserAccount()
      .then((userData) => {
        // If user data exists, dispatch login action
        if (userData) {
          dispatch(login(userData));
        } else {
          // If no user data, dispatch logout action
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false)); // Set loading to false when data fetching is completed
  }, []); // Empty dependency array to ensure useEffect runs only once when the component mounts

  // Render the layout once loading is complete
  return !loading ? (
    <>
      {/* Header component */}
      <Header />

      {/* Outlet for rendering nested routes */}
      <Outlet />

      {/* Footer component */}
      <Footer />
    </>
  ) : null;
}

export default Layout;
