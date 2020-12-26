import Head from "next/head";
import AuthContainer from "../components/AuthContainer";
import {
  nameFieldReducer,
  emailFieldReducer,
  passwordFieldReducer,
} from "../reducers/inputReducers";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const allInputReducers = combineReducers({
  name: nameFieldReducer,
  email: emailFieldReducer,
  password: passwordFieldReducer,
});

const store = createStore(allInputReducers);

export default function Login() {
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
          requestMode={"login"}
          title="Login"
          content=" "
          types={[
            {
              name: "email",
              placeholder: "Email",
              type: "email",
              icon: "email",
              autoComplete: "email",
            },
            {
              name: "password",
              placeholder: "Password",
              type: "password",
              icon: "lock",
              autoComplete: "current-password",
            },
          ]}
          buttonText={"Login"}
          authPathName={"Register"}
          authPath={"/"}
          authText={"Don’t have an account yet? "}
        ></AuthContainer>
      </div>
    </Provider>
  );
}
