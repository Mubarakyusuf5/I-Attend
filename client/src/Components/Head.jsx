import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Head = ({ Click, Click1, Title, btnName, btnName1, Input, val }) => {
  return (
    <>
      <div className="mt-8">
        <div className="bg-customGreen flex items-start gap-2 md:items-center rounded-t-md flex-col md:flex-row md:justify-between p-4">
          <h3 className="text-white text-xl font-bold">{Title}</h3>

          <div className="flex gap-2 md:gap-5 flex-col md:flex-row md:items-center">
            <button
              onClick={Click}
              className="button py-2 px-4 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-customOrange transition-all duration-300 cursor-pointer"
            >
              {` + Add ${btnName}`}
            </button>
            <button
              onClick={Click1}
              className="filter py-2 px-4 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-customOrange transition-all duration-300 cursor-pointer"
            >
              {`${btnName1}`}
            </button>
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white pr-2">
              <input
                type="text"
                placeholder="Search here"
                onChange={Input}
                value={val}
                className="border-0 outline-0 py-2 px-4 w-48 bg-transparent"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
