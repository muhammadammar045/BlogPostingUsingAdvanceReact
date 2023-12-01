import React from "react";
import { Button } from "../componentExporter";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/AuthenticationSlice";
import appwriteAuthenticationService from "../../appwrite/appwriteUserFunction";
import { useDispatch } from "react-redux";

function Logout() {
  const navigate = useNavigate(); // React Router hook for navigation
  const dispatch = useDispatch(); // Redux hook for dispatching actions

  // Function to handle the logout process
  const logoutHandle = () => {
    // Call the logout function from the Appwrite authentication service
    appwriteAuthenticationService.logoutUserAccount().then(() => {
      // Dispatch a logout action to update Redux state
      dispatch(logout());
      navigate("/login"); // Redirect to the login page after successful logout
    });
  };

  // Rendering a Button component with onClick event for logout
  return <Button onClick={logoutHandle}>Logout</Button>;
}

export default Logout;
