import authStyles from "../sass/auth.module.scss";
import FormContainer from "./FormContainer";
import Logo from "../public/images/devchallenges.svg";
import ContentBelow from "./ContentBelow";
import TextContent from "./TextContent";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { resetRequestState } from "../actions/inputActions";
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

  const [errorMessage, setErrorMessage] = useState("");

  function userRegister() {
    axios
      .post("http://localhost:4000/api/register", {
        name: states.name,
        email: states.email,
        password: states.password,
      })
      .then((res) => {
        dispatch(resetRequestState());
        if (res.data === "USER CREATED") {
          return router.push("/profile");
        } else {
          return setErrorMessage(res.data.message);
        }
      });
  }

  function userLogin() {
    console.log("caiu no login");
  }

  if (states.request) {
    if (props.requestMode === "register") {
      userRegister();
    } else {
      userLogin();
    }
  }

  return (
    <main className={authStyles.loginContainer}>
      <div className={authStyles.logo}>
        <Logo></Logo>
      </div>
      <TextContent title={props.title} content={props.content}></TextContent>
      <FormContainer
        types={props.types}
        buttonText={props.buttonText}
      ></FormContainer>
      <div>
        <h1>{errorMessage !== "" ? errorMessage : ""}</h1>
      </div>
      <ContentBelow
        authText={props.authText}
        authPathName={props.authPathName}
        authPath={props.authPath}
      ></ContentBelow>
    </main>
  );
}
