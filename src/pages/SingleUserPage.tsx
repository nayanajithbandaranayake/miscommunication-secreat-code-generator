import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Head from "../components/Head";
import Loading from "../components/Loading";
import UserAddedPatternsTable from "../components/UserAddedPatternsTable";
import UserOwnPatternTable from "../components/UserOwnPatternTable";
import UserPatternManageArea from "../components/UserPatternManageArea";
import { useGlobalContext } from "../context/GlobalContext";
import { useProfileContext } from "../context/ProfileContext";

const SingleUserPage = () => {
  const { username } = useParams<{ username?: string }>();
  const { fetchPatterns } = useProfileContext()!;
  const { isLoading } = useGlobalContext()!;

  useEffect(() => {
    fetchPatterns();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="section profile">
      <Head
        title="Profile"
        description="Here is your Miscommunication Profile."
        keywords="profile"
      />
      <div className="hero">
        <h1>Hello {username}</h1>
        <p>
          This is your Profile. You can view your patterns and the patterns you
          added. And also you can create patterns.
        </p>
      </div>
      <UserPatternManageArea />
      <UserOwnPatternTable />
      <UserAddedPatternsTable />
    </section>
  );
};

export default SingleUserPage;
