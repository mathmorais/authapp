import Head from "next/head";
import ProfileContainer from "../components/pages/ProfilePage/ProfileContainer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { userStorageReducer } from "../reducers/profileReducer";

import { createStore } from "redux";
import { Provider } from "react-redux";

export default function Profile() {
  const router = useRouter();
  const store = createStore(userStorageReducer);

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === ""
    ) {
      router.push("/");
    }
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
