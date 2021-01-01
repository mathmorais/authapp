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
import Footer from "../components/global/Footer";

const allInputReducers = combineReducers({
  name: nameFieldReducer,
  email: emailFieldReducer,
  password: passwordFieldReducer,
  request: makeARequest,
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
          content="Fill the fields below"
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
        <Footer width={"33%"} maxWidth={"700px"} minWidth={"475px"}></Footer>
      </div>
    </Provider>
  );
}
