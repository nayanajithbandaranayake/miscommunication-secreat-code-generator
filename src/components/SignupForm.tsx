import React from "react";
import { useSignupContext } from "../context/SignupContext";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { ImSpinner8 } from "react-icons/im";

const SignupForm = () => {
  const {
    signup_data,
    username_error,
    email_error,
    password_error,
    confirm_error,
    empty_error,
    email_post_error,
    username_post_error,
    updateInputs,
    validateEmail,
    validateUsername,
    validatePassword,
    validateConfirm,
    verifyData,
    setError,
    clicked,
    setClicked,
    postData,
  } = useSignupContext()!;

  const { isLoading, isVerified } = useGlobalContext()!;

  const { username, password, email, confirmPassword } = signup_data;
  const history = useHistory();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    updateInputs(name, value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setClicked();

    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    validateConfirm(confirmPassword);

    if (username && password && email && confirmPassword) {
      setError("empty", false);
    } else {
      setError("empty", true);
    }
    verifyData(username, email);

    if (
      !username_error &&
      !email_error &&
      !password_error &&
      !confirm_error &&
      !empty_error &&
      !email_post_error &&
      !username_post_error
    ) {
      if (isVerified) {
        postData(username, email, password);
        if (isLoading === false) {
          history.push("/");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="signup-username">
          username <sup>*</sup>
        </label>
        <input
          type="text"
          name="username"
          id="signup-username"
          value={username}
          onChange={handleChange}
        />
        {clicked && username_error && (
          <h4 className="error">
            Username length should be greater than 5 and less than 20.
          </h4>
        )}
      </div>

      <div>
        <label htmlFor="signup-email">
          email <sup>*</sup>
        </label>
        <input
          type="text"
          name="email"
          id="signup-email"
          value={email}
          onChange={handleChange}
        />
        {clicked && email_error && (
          <h4 className="error">Enter a valid email address.</h4>
        )}
      </div>
      <div>
        <label htmlFor="signup-password">
          password <sup>*</sup>
        </label>
        <input
          type="password"
          name="password"
          id="signup-password"
          value={password}
          onChange={handleChange}
        />
        {clicked && password_error && (
          <h4 className="error">Password should be at least 8 characters.</h4>
        )}
      </div>

      <div>
        <label htmlFor="signup-confirm">
          confirm <sup>*</sup>
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="signup-confirm"
          value={confirmPassword}
          onChange={handleChange}
        />
        {clicked && confirm_error && (
          <h4 className="error">Password confirmation does not match.</h4>
        )}
      </div>
      {clicked && empty_error && (
        <h4 className="error">Please fill out necessary fields.</h4>
      )}
      <button type="submit" className="btn signup-btn">
        {isLoading ? (
          <div className="spinner">
            <ImSpinner8 />
          </div>
        ) : (
          "Sign up"
        )}
      </button>
      <div className="post-script">
        <h3>
          Already have a account? <Link to="/login">Log in</Link>
        </h3>
      </div>
      {email_post_error && username_post_error && (
        <h4 className="error">Account is availiable please log in.</h4>
      )}
      {!email_post_error && username_post_error && (
        <h4 className="error">Username already exists please pick another.</h4>
      )}
      {email_post_error && !username_post_error && (
        <h4 className="error">Email address is availible.</h4>
      )}
    </form>
  );
};

export default SignupForm;
