import React, { useState } from "react";
import { Button, Input } from "../componentExporter";
import { useForm } from "react-hook-form";
import appwriteAuthenticationService from "../../appwrite/appwriteUserFunction";
import { login } from "../../store/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Signup() {
  // React Hooks for managing form state
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Function to handle signup form submission
  const SignupFunction = async (data) => {
    setError("");
    try {
      // Create user account using appwriteAuthenticationService
      const userIsCreated =
        await appwriteAuthenticationService.createUserAccount(data);

      if (userIsCreated) {
        // If account creation is successful, get current user data
        const userData =
          await appwriteAuthenticationService.getCurrentUserAccount();

        if (userData) dispatch(login({ userData })); // Dispatch login action with user data and navigate to home
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="bg-black text-white body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Signup Here
          </h1>
          <p className="leading-relaxed mt-4">
            All the Data will be secured your are welcome here
          </p>
        </div>

        <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Signup Form
          </h2>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          {/* Form for user signup */}
          <form onSubmit={handleSubmit(SignupFunction)}>
            <div className="relative mb-4">
              <Input
                label="Name :"
                type="text"
                placeholder="Enter Name"
                {...register("name", { required: true })}
              />
            </div>

            <div className="relative mb-4">
              <Input
                label="Email :"
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: true })}
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
            {/* Submit button for the form */}
            <Button type="submit" className="w-full">
              SignUp
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard of them jean shorts.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
