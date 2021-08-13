import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Head from "../components/Head";
import { useGlobalContext } from "../context/GlobalContext";
import { ImSpinner8 } from "react-icons/im";

const ForgotPasswordPage = () => {
  const { isLoading, setIsLoading } = useGlobalContext()!;

  const BACKEND = process.env.REACT_APP_BACKEND;
  const history = useHistory();
  const [info, setInfo] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirm: false,
  });
  const [verified, setVerified] = useState(false);
  const validateEmail = async () => {
    const { data } = await axios.get(
      `${BACKEND}/users/verify/email?email=${info.email}`
    );
    setErrors((current) => {
      return {
        ...current,
        email: data.error,
      };
    });
  };
  const validatePassword = () => {
    if (info.password.length >= 8) {
      setErrors((current) => {
        return {
          ...current,
          password: false,
        };
      });
    } else {
      setErrors((current) => {
        return {
          ...current,
          password: true,
        };
      });
    }
  };
  const validateConfirm = () => {
    if (info.password === info.confirm_password) {
      setErrors((current) => {
        return {
          ...current,
          confirm: false,
        };
      });
    } else {
      setErrors((current) => {
        return {
          ...current,
          confirm: true,
        };
      });
    }
  };

  const validateAll = () => {
    setVerified(false);
    validateEmail();
    validatePassword();
    validateConfirm();
    setVerified(true);
  };

  const updateUser = async () => {
    setIsLoading(true);
    await axios.put(`${BACKEND}/users`, {
      email: info.email,
      password: info.password,
    });
    setIsLoading(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validateAll();
    if (verified) {
      if (!errors.confirm && !errors.email && !errors.password) {
        updateUser();
        if (!isLoading) history.push("/login");
      }
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInfo((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className="section section-center">
      <Head
        title="Forgot Password"
        description="Lost your password here we'll fix it."
        keywords="forgot password reset"
      />
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="resetEmail">email</label>
          <input
            type="text"
            name="email"
            id="resetEmail"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="resetNewPassword">password</label>
          <input
            type="password"
            name="password"
            id="resetNewPassword"
            value={info.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="resetConfirmPassword">confirm password</label>
          <input
            type="password"
            name="confirm_password"
            id="resetConfirmPassword"
            value={info.confirm_password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn submit-btn">
          {isLoading ? (
            <div className="spinner">
              <ImSpinner8 />
            </div>
          ) : (
            "Reset"
          )}
        </button>
        {errors.email && <h4 className="error">Email error!</h4>}
        {errors.password && (
          <h4 className="error">Password length must be above 8 characters.</h4>
        )}
        {errors.confirm && (
          <h4 className="error">Confirm does not match the password.</h4>
        )}
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
