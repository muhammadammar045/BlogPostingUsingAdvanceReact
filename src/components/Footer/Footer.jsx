import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // Footer section with a dark background and white text
    <footer className="bg-slate-800 text-white body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Left section containing brand name and description */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            to={"/"}
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <span className="ml-3 text-xl">Tailblocks</span>
          </Link>
          <p className="mt-2 text-sm text-white">
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </div>

        {/* Right section containing category links */}
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Category section 1 */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  First Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Second Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Third Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>

          {/* Category section 2 */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  First Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Second Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Third Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>

          {/* Category section 3 */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  First Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Second Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Third Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>

          {/* Category section 4 */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  First Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Second Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Third Link
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-white hover:text-gray-800">
                  Fourth Link
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
