import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1437751068958-82e6fccc9360?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxib29rJTIwZGFyayUyMHRvbmV8ZW58MHx8MHx8fDA%3D)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-white font-bold">
            Welcome to bookVault{" "}
          </h1>
          <p className="mb-5 text-lg font-medium font-transparent">
            - Where Every Page Holds a New Adventure! Dive into a World of Books
            and Explore Boundless Stories Just for You. Shop Now and Let Your
            Imagination Soar!
          </p>
          <NavLink
            to="/products"
            className="btn  bg-gray-800 border-none text-white "
          >
            Start Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
