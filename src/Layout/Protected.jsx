import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authenticationStatus = useSelector(
    (state) => state.userAuthentication.status
  );

  useEffect(() => {
    // // Redirect to login if authentication is required and user is not authenticated
    // if (authentication && !authenticationStatus) {
    //   navigate("/login");
    // }
    // // Redirect to home if authentication is not required and user is authenticated
    // else if (!authentication && authenticationStatus) {
    //   navigate("/");
    // }

    //    true         =          true                 true               result = false
    if (authentication && authenticationStatus !== authentication) {
      navigate("/login");
    }
    //        !   true       =          true                   true       result = true
    else if (!authentication && authenticationStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authenticationStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
