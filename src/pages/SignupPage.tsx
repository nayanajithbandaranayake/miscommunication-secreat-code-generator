import React from "react";
import Head from "../components/Head";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <section className="section section-center">
      <Head
        title="Signup"
        description="Here you can signup for Miscommunication"
        keywords="signup"
      />
      <SignupForm />
    </section>
  );
};

export default SignupPage;
