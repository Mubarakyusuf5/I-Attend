import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PrintToken } from "../../Components/PrintToken";
import { useReactToPrint } from "react-to-print";

export const GenerateTokenPage = () => {
  const [tokens, setTokens] = useState([]);
  const [errors, setErrors] = useState("");

  const contentRef = useRef();
  const handleReactToPrint = useReactToPrint({contentRef});

  const handleGenerateToken = async () => {
    try {
      const { data } = await axios.post("/api/lecturer/generateToken");
      toast.success(data.message);
      fetchToken();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate token");
    }
  };

  const fetchToken = async () => {
    try {
      const { data } = await axios.get("/api/lecturer/getTodaysToken");
      setTokens(data);
      setErrors(""); // Clear errors on successful fetch
    } catch (error) {
      setTokens([]); // Ensure tokens are cleared on error
      setErrors(error.response?.data?.message || "Failed to fetch tokens");
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="bg-customGray min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-customGreen text-2xl font-bold mb-6">
        Generate Token
      </h1>

      {/* Generate Token Button */}
      <button
        onClick={handleGenerateToken}
        className="bg-customOrange text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-customGreen mb-6"
      >
        Generate Token
      </button>

      {/* print button */}
      {tokens.length > 0 && (
        <>
        <button onClick={handleReactToPrint} className="bg-customGreen py-2 px-5 hover:bg-green-600 transition duration-300 rounded-md text-white">Print Tokens</button>
        <p className="text-center text-green-500 font-medium my-2">
          The below are tokens generated for today!
        </p>
        </>
      )}
      {/* {tokens.length > 0 && ( */}
      {/* Tokens Table */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-customGreen text-white">
            <tr>
              <th className="border border-gray-200 px-4 py-2">#</th>
              <th className="border border-gray-200 px-4 py-2">Token</th>
              {/* <th className="border border-gray-200 px-4 py-2">Created At</th> */}
            </tr>
          </thead>
          <tbody>
            {tokens.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-red-500 py-4">
                  {errors}
                </td>
              </tr>
            ) : (
              tokens.map((token, index) => (
                <tr key={token._id} className="text-center hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {token.token}
                  </td>
                  {/* <td className="border border-gray-200 px-4 py-2">
                    {new Date(token.date).toLocaleString()}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="hidden">
      <PrintToken 
      tokens={tokens}
      ref={contentRef}
      />
      </div>
      {/* )} */}
    </div>
  );
};
