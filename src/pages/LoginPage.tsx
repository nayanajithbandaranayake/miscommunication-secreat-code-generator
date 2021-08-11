import React from "react";
import Head from "../components/Head";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <section className="section section-center">
      <Head
        title="Login"
        description="Login to Miscommunication to save your progress."
        keywords="secret code miscommunication login"
      />
      <LoginForm />
    </section>
  );
};

export default LoginPage;
