import React, { useState } from 'react';

export const GenerateTokenPage = () => {
  const [tokens, setTokens] = useState([]);

  const handleGenerateToken = () => {
    const newToken = {
      id: tokens.length + 1,
      token: Math.random().toString(36).substr(2, 8).toUpperCase(),
      createdAt: new Date().toLocaleString(),
    };
    setTokens((prevTokens) => [...prevTokens, newToken]);
  };

  return (
    <div className="bg-customGray min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-customGreen text-2xl font-bold mb-6">Generate Token</h1>

      {/* Generate Token Button */}
      <button
        onClick={handleGenerateToken}
        className="bg-customOrange text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-customGreen mb-6"
      >
        Generate Token
      </button>

      {/* Tokens Table */}
      {tokens.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-customGreen text-white">
              <tr>
                <th className="border border-gray-200 px-4 py-2">#</th>
                <th className="border border-gray-200 px-4 py-2">Token</th>
                <th className="border border-gray-200 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.id} className="text-center">
                  <td className="border border-gray-200 px-4 py-2">{token.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{token.token}</td>
                  <td className="border border-gray-200 px-4 py-2">{token.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

