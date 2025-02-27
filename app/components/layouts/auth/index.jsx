import React from "react";

function LayoutLogin({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#4baeff] flex justify-center items-center">
      {children}
    </div>
  );
}

export default LayoutLogin;
