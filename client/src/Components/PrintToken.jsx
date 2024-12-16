import React, { forwardRef } from "react";

export const PrintToken = forwardRef(({tokens}, ref) => {
//   const { tokens } = props;


  return (
    <div ref={ref} className="w-[300px] p-3">
      <h2 className="text-center text-customGreen font-bold text-xl mb-4">
        SEN2212 - Tokens for Today
      </h2>
      <ul>
        {tokens.map((token, index) => (
          <li key={index} className="p-2 border">
            {index + 1}. {token.token}
          </li>
        ))}
      </ul>
    </div>
  );
});

