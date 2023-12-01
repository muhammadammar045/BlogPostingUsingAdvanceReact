import React from "react";
import { Logout } from "../componentExporter";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  // Fetching authentication status from Redux state
  const authenticationStatus = useSelector(
    (state) => state.userAuthentication.status
  );

  // Navigation links with associated paths and active status
  const navLinks = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authenticationStatus,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !authenticationStatus,
    },
    {
      name: "AllPost",
      path: "/allPost",
      active: authenticationStatus,
    },
    {
      name: "AddPost",
      path: "/addPost",
      active: authenticationStatus,
    },
  ];

  return (
    <header className="bg-slate-800 text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo or brand name */}
        <Link className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">BlogPosting</span>
        </Link>

        {/* Navigation links */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navLinks.map((link) =>
            link.active ? (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `mr-5 hover:text-white ${
                    isActive ? "text-orange-400" : "text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ) : null
          )}
        </nav>

        {/* User authentication actions */}
        <div className="flex gap-2">
          <div className="flex gap-2">{authenticationStatus && <Logout />}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
