import Head from "next/head";
import AuthContainer from "../components/pages/AuthPages/AuthContainer";
import {
  nameFieldReducer,
  emailFieldReducer,
  passwordFieldReducer,
  makeARequest,
} from "../reducers/inputReducers";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const allInputReducers = combineReducers({
  name: nameFieldReducer,
  email: emailFieldReducer,
  password: passwordFieldReducer,
  request: makeARequest,
});

const store = createStore(allInputReducers);

export default function Home() {
  return (
    <Provider store={store}>
      <div className="container">
        <Head>
          <title>Auth App</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          ></link>
        </Head>
        <AuthContainer
          requestMode={"register"}
          title="Join thousands of learners from around the world "
          content="Master web development by making real-life projects. There are multiple paths for you to choose"
          types={[
            {
              name: "name",
              placeholder: "Name",
              type: "text",
              icon: "account_box",
            },
            {
              name: "email",
              placeholder: "Email",
              type: "email",
              icon: "email",
            },
            {
              name: "password",
              placeholder: "Password",
              type: "password",
              icon: "lock",
            },
          ]}
          buttonText={"Start coding now"}
          authPathName={"Login"}
          authPath={"/login"}
          authText={"Already a member? "}
        ></AuthContainer>
      </div>
    </Provider>
  );
}
