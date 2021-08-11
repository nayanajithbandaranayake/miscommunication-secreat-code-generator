import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { isLogged, logout } = useGlobalContext()!;
  const [active, setActive] = useState("home");
  return (
    <header className="header">
      <div className="title-container">
        <h1>
          <Link to="/">Miscommunication</Link>
        </h1>
        <nav>
          <Link
            to="/"
            className={active === "home" ? "active" : undefined}
            onClick={() => setActive("home")}
          >
            Home
          </Link>
          <Link
            to="/library"
            className={active === "library" ? "active" : undefined}
            onClick={() => setActive("library")}
          >
            Library
          </Link>
          {isLogged && (
            <Link
              to={`/profile/${
                JSON.parse(localStorage.getItem("user")!)[0].username
              }`}
              className={active === "profile" ? "active" : undefined}
              onClick={() => setActive("profile")}
            >
              Profile
            </Link>
          )}
        </nav>
      </div>
      {isLogged ? (
        <div className="btn-container">
          <button className="btn login-btn" onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="btn-container">
          <button className="btn signup-btn">
            <Link to="/signup">Sign up</Link>
          </button>
          <button className="btn login-btn">
            <Link to="/login">Log in</Link>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
