import authStyles from "../../../sass/auth.module.scss";
import FormContainer from "./FormContainer";
import Logo from "../../../public/images/devchallenges.svg";
import ContentBelow from "./ContentBelow";
import TextContent from "./TextContent";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRequestState,
  resetAllStates,
} from "../../../actions/inputActions";
import axios from "axios";

export default function AuthContainer(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const states = useSelector((state) => {
    return {
      name: state.name,
      email: state.email,
      password: state.password,
      request: state.request,
    };
  });

  useEffect(() => {
    clearStates();
  }, []);

  const [errorMessage, setErrorMessage] = useState("");

  function userRegister() {
    dispatch(resetRequestState());

    const user = {
      name: states.name,
      email: states.email,
      password: states.password,
    };

    if (checkIfStatesIsEmpty(user)) {
      return setErrorMessage("Fill the fields below");
    }

    axios.post("http://localhost:4000/api/register", user).then((res) => {
      if (res.data === "USER CREATED") {
        clearStates();
        return router.push("/profile");
      } else {
        return setErrorMessage(res.data);
      }
    });
  }

  function userLogin() {
    dispatch(resetRequestState());

    const user = {
      email: states.email,
      password: states.password,
    };

    if (checkIfStatesIsEmpty(user)) {
      return setErrorMessage("Fill the fields below");
    }

    axios.post("http://localhost:4000/api/login", user).then((res) => {
      const tokenAuth = res.data.token;

      if (res.data.message === "OK") {
        clearStates();
        localStorage.setItem("token", tokenAuth);
        return router.push("/profile");
      } else {
        return setErrorMessage(res.data);
      }
    });
  }

  function clearStates() {
    return dispatch(resetAllStates());
  }

  function checkIfStatesIsEmpty(user) {
    for (let state in user) {
      return user[state] === "";
    }
  }

  function checkErrorMessage() {
    switch (errorMessage) {
      case "REJECTED":
        return "Email or Password incorrect";
      case "EMAIL ALREADY EXIST":
        return "Email already exist";
      default:
        return errorMessage;
    }
  }

  if (states.request) {
    if (props.requestMode === "register") {
      userRegister();
    } else if (props.requestMode === "login") {
      userLogin();
    }
  }

  return (
    <main className={authStyles.loginContainer}>
      <div className={authStyles.logo}>
        <Logo></Logo>
      </div>
      <TextContent title={props.title} content={props.content}></TextContent>
      <div
        style={errorMessage ? { opacity: 1 } : { opacity: 0 }}
        className={authStyles.errorMessage}
      >
        <h1>{checkErrorMessage()}</h1>
      </div>
      <FormContainer
        types={props.types}
        buttonText={props.buttonText}
      ></FormContainer>
      <ContentBelow
        authText={props.authText}
        authPathName={props.authPathName}
        authPath={props.authPath}
      ></ContentBelow>
    </main>
  );
}
