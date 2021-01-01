import Head from "next/head";
import ProfileContainer from "../components/pages/ProfilePage/ProfileContainer";
import { useRouter } from "next/router";
import { userStorageReducer } from "../reducers/profileReducer";
import { globalImageReducer } from "../reducers/globalImageReducer";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Header from "../components/pages/ProfilePage/Header";
import Footer from "../components/global/Footer";

export default function Profile() {
  const router = useRouter();
  const store = createStore(
    combineReducers({
      storage: userStorageReducer,
      globalImageURL: globalImageReducer,
    })
  );

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
        <Footer width={"70%"}></Footer>
      </div>
    </Provider>
  );
}
