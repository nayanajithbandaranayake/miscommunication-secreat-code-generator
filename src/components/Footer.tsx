import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Footer = () => {
  const { isLogged } = useGlobalContext()!;

  return (
    <footer>
      <article>
        <div>
          <h4>Miscommunication</h4>
          <p>
            Miscommunication is a secret code generator that uses a secret
            pattern. We use ASCII as our default pattern{" "}
            {"(a pattern which contain seven 1 and 0 s)"}. You can sign up and
            make your own patterns.
          </p>
        </div>
      </article>
      <article>
        <div>
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            {isLogged ? (
              <li>
                <Link
                  to={`/profile/${
                    JSON.parse(localStorage.getItem("user")!).username
                  }`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </article>
      <div className="copyright">
        <h5>Created by Nayanajith Bandaranayake &copy; 2021</h5>
      </div>
    </footer>
  );
};

export default Footer;
