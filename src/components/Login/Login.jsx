import React, { useState } from "react";
import { Button, Input } from "../componentExporter";
import appwriteAuthenticationService from "../../appwrite/appwriteUserFunction";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthenticationSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  // Function to handle the login form submission
  const loginFunction = async (data) => {
    setError(""); // Clear any previous error messages

    try {
      // Attempt to log in the user using Appwrite authentication service
      const userLoggedIn = await appwriteAuthenticationService.loginUserAccount(
        data
      );

      if (userLoggedIn) {
        // If the user is successfully logged in, get the current user data
        const userData =
          await appwriteAuthenticationService.getCurrentUserAccount();

        if (userData) {
          // Dispatch a login action with the user data to update Redux state
          dispatch(login({ userData }));
          navigate("/"); // Redirect to the home page after successful login
        }
      }
    } catch (error) {
      setError(error.message); // Set the error message in case of login failure
    }
  };

  return (
    // Login section with background, text color, and container styling
    <section className="bg-black text-white body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        {/* Left section with title and description */}
        <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Login Here
          </h1>
          <p className="leading-relaxed mt-4">
            All the Data will be secured you are welcome here
          </p>
        </div>

        {/* Right section with the login form */}
        <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Login Form
          </h2>

          {/* Display error message if login fails */}
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          {/* Login form with email and password inputs */}
          <form onSubmit={handleSubmit(loginFunction)}>
            <div className="relative mb-4">
              <Input
                label="Email :"
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="relative mb-4">
              <Input
                label="Password :"
                text="text-black"
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true, minLength: 8 })}
              />
            </div>

            {/* Submit button for the login form */}
            <Button type="submit" className="w-full">
              Login
            </Button>

            {/* Additional information or message */}
            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard of them jean shorts.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
