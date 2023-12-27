import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-800">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
