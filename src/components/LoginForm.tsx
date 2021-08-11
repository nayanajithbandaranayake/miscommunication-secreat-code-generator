import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useLoginContext } from "../context/LoginContext";

const LoginForm = () => {
  const {
    login_data: { email, password },
    email_error,
    updateInputs,
    empty_error,
    setError,
    setClicked,
    clicked,
    post_error,
    validateEmail,
    postLoginData,
    verifyData,
  } = useLoginContext()!;
  const history = useHistory();

  const { isLoading, isVerified } = useGlobalContext()!;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateEmail(email);
    updateInputs(name, value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email && password) {
      setError(false, "empty");
    } else {
      setError(true, "empty");
    }

    setClicked();

    verifyData(email, password);
    if (!email_error && !empty_error && !post_error) {
      if (isVerified) {
        postLoginData(email, password);
        if (!isLoading) {
          history.push("/");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="login-email">
          email <sup>*</sup>
        </label>
        <input
          type="text"
          name="email"
          id="login-email"
          value={email}
          onChange={handleChange}
        />
        {clicked && email_error && (
          <h4 className="error">Enter a valid email.</h4>
        )}
      </div>
      <div>
        <label htmlFor="login-password">
          password <sup>*</sup>
        </label>
        <input
          type="password"
          name="password"
          id="login-password"
          value={password}
          onChange={handleChange}
        />
        <div className="post-script">
          <h4>
            Forgot password? <Link to="/reset/password">Reset password.</Link>
          </h4>
        </div>
      </div>
      <button type="submit" className="btn login-btn">
        Log in
      </button>
      <div className="post-script">
        <h3>
          Don't have a account? <Link to="/signup">Sign up</Link>
        </h3>
      </div>
      {clicked && empty_error && (
        <h4 className="error">Please fill out necessary information.</h4>
      )}
      {post_error && (
        <h4 className="error">At least one of your credential is incorrect.</h4>
      )}
    </form>
  );
};

export default LoginForm;
