import Head from "next/head";
import ProfileContainer from "../components/pages/ProfilePage/ProfileContainer";
import { useRouter } from "next/router";
import { userStorageReducer } from "../reducers/profileReducer";

import { createStore } from "redux";
import { Provider } from "react-redux";
import Header from "../components/pages/ProfilePage/Header";

export default function Profile() {
  const router = useRouter();
  const store = createStore(userStorageReducer);

  // Check if has a token on localstorage
  if (process.browser) {
    localStorage.getItem("token") ? null : router.push("/login");
  }

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
        <Header></Header>
        <ProfileContainer></ProfileContainer>
      </div>
    </Provider>
  );
}
