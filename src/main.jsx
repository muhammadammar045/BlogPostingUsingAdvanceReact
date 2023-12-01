import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Redux Store Setting

import { Provider } from "react-redux";
import store from "./store/Store.js";

// Store Setting Ends here

// All the router Setting

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  AddPost,
  AllPost,
  EditPost,
  Home,
  Login,
  Signup,
} from "./pages/pagesExporter.js";
import Layout from "./Layout/Layout.jsx";
import Protected from "./Layout/Protected.jsx";
import Post from "./pages/Post.jsx";

// Create a BrowserRouter and define routes using createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    // Layout component is the parent for all routes
    <Route path="/" element={<Layout />}>
      {/* Home page */}
      <Route path="" element={<Home />} />
      {/* AllPost page with authentication protection */}
      <Route
        path="AllPost"
        element={
          <Protected authentication>
            <AllPost />
          </Protected>
        }
      />
      {/* AddPost page with authentication protection */}
      <Route
        path="addPost"
        element={
          <Protected authentication>
            <AddPost />
          </Protected>
        }
      />
      {/* EditPost page with authentication protection */}
      <Route
        path="edit-post/:slug"
        element={
          <Protected authentication>
            <EditPost />
          </Protected>
        }
      />
      {/* Login page without authentication */}
      <Route
        path="login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      {/* Signup page without authentication */}
      <Route
        path="signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      {/* Post page */}
      <Route path="post/:slug" element={<Post />} />
    </Route>
  )
);

// Router Setting Ends Here

// Render the application with Redux store and router
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
