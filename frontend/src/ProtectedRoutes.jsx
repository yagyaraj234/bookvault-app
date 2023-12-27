import { Outlet, Navigate } from "react-router-dom";

export const NotLoggedInProtected = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export const LoggedInProtected = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
