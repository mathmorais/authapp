import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { userStorageReducer } from "../reducers/profileReducer";
import { globalImageReducer } from "../reducers/globalImageReducer";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Header from "../components/pages/ProfilePage/Header";
import ProfileEdit from "../components/pages/ProfilePage/ProfileEdit";
import Footer from "../components/global/Footer";

export default function Profile() {
  const router = useRouter();
  const store = createStore(
    combineReducers({
      storage: userStorageReducer,
      globalImageURL: globalImageReducer,
    })
  );

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
        <Header></Header>
        <ProfileEdit></ProfileEdit>
        <Footer width={"70%"}></Footer>
      </div>
    </Provider>
  );
}
