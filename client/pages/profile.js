import Head from "next/head";
import ProfileContainer from "../components/pages/ProfilePage/ProfileContainer";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === ""
    ) {
      router.push("/");
    }
  }, []);

  return (
    <div className="profile-container">
      <Head>
        <title>Profile</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <ProfileContainer></ProfileContainer>
    </div>
  );
}
