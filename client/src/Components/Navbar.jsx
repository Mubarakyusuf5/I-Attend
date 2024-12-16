import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Navbar = () => {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false)

  const toggle = ()=>{
    setOpen(prev => !prev)
  }

  const Logout = () => {
    logout();
  };

  // Function to extract initials from fullname
  const getInitials = (fullname) => {
    if (!fullname) return "G"; // Default to "G" for Guest
    return fullname
      .trim()
      .split(/\s+/) // Split by spaces
      .map((name) => name[0].toUpperCase()) // Get first letter
      .slice(0, 2) // Limit to two initials
      .join(""); // Join initials
  };

  const initials = getInitials(user?.fullname);

  return (
    <nav className="bg-customGreen text-white py-3 px-6 shadow-md flex items-center justify-between sticky top-0 z-50">
      {/* Website Name */}
      <h1 className="text-customGray text-2xl font-bold">
        {user?.role === "Lecturer" ? (
          <Link to="/lecturer/dashboard" className="md:hover:text-gray-500">
            Attendee
          </Link>
        ) : (
          <h1 className="hover:text-gray-500">Attendee</h1>
        )}
      </h1>

      {/* Toggle button */}
      <FontAwesomeIcon
        icon={faBars}
        size="xl"
        className="md:hidden p-1 bg-gray-300 rounded bg-opacity-40"
        onClick={toggle}
      />

      {/* Links */}
      <div className="items-center space-x-6 hidden md:flex">
        <Link
          to="/lecturer/dashboard"
          className={
            user?.role === "Student"
              ? "hidden"
              : `text-customGray hover:underline hover:text-gray-500 text-lg `
          }
        >
          Home
        </Link>
        <Link
          to="/generate-token"
          className={
            user?.role === "Student"
              ? "hidden"
              : "text-customGray hover:underline hover:text-gray-500 text-lg"
          }
        >
          Generate Token
        </Link>
        <button
          className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md"
          onClick={Logout}
        >
          Logout
        </button>

        {/* User Profile with Initials */}
        <div className="flex items-center space-x-3 border-l-2 border-gray-100 pl-2">
          <div className="text-right">
            <p className="text-sm font-medium text-customGray">
              {user?.fullname || "Guest"}
            </p>
            <p className="text-xs text-customGray">{user?.role || "No Role"}</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gray-500">
            {initials}
          </div>
        </div>
      </div>

      {/* mobile view navbar */}
      <div className={`absolute top-[56px] ${open ? "left-0" : "-left-[230px]"}  transition-all duration-300 sm:hidden ` } style={{zIndex: 70000}}>
        <div
          className=" w-[230px] bg-white text-black px-2"
          style={{ height: "calc(100vh - 63px)" }}
        >
          <div className={` ${user.role === "Student" ? "border-b mb-2" : ""} flex justify-center items-center flex-col py-3 `}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl bg-gray-500">
              {initials}
            </div>
            <p className="text-lg font-medium ">{user?.fullname || "Guest"}</p>
            <p className="text-sm ">{user?.role || "No Role"}</p>
          </div>
          <div className={user.role === "Student" ? "hidden" : ``}>
            <ul className="p-1 rounded-md">
              <li>
                <NavLink
                  to="/lecturer/dashboard"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-gray-100" : ""
                    } border-y w-full block hover:bg-gray-100 rounded-md py-2 px-3`
                  }
                  onClick={()=> setOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lecturer/displayStudent"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-gray-100" : ""
                    } border-b w-full block hover:bg-gray-100 rounded-md py-2 px-3`
                  }
                  onClick={()=> setOpen(false)}
                >
                  Display Students
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lecturer/generateToken"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-gray-100" : ""
                    } border-b w-full block hover:bg-gray-100 rounded-md py-2 px-3`
                  }
                  onClick={()=> setOpen(false)}
                >
                  Generate Token
                </NavLink>
              </li>
            </ul>
          </div>
            <button
            className="py-2 px-4 w-full text-white mt-1 bg-red-500 hover:bg-red-600 rounded-md"
            onClick={Logout}
            >
              Logout
            </button>
        </div>
      </div>
    </nav>
  );
};
