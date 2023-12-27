import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-5 md:p-10 bg-neutral text-neutral-content flex flex-wrap max-sm:justify-center justify-around ">
      <nav>
        <header className="footer-title">Services</header>
        <NavLink to="/" className="link link-hover">
          Branding
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Design
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Marketing
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Advertisement
        </NavLink>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <NavLink to="/" className="link link-hover">
          About us
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Contact
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Jobs
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Press kit
        </NavLink>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <NavLink to="/" className="link link-hover">
          Terms of use
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Privacy policy
        </NavLink>
        <NavLink to="/" className="link link-hover">
          Cookie policy
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
