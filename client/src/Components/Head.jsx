import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Head = ({ Click, Title, btnName, Input, val }) => {
  return (
    <>
      <div className="mt-8">
        <div className="bg-customGreen flex items-center rounded-t-md justify-between p-4">
          <h3 className="text-white text-lg font-bold">{Title}</h3>

          <div className="flex gap-5 items-center">
            <button
              onClick={Click}
              className="py-2 px-4 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-customOrange transition-all duration-300 cursor-pointer"
            >
              {` + Add ${btnName}`}
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
