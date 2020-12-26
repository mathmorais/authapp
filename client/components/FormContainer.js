import authStyles from "../sass/auth.module.scss";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../actions/inputActions";
import { useState } from "react";

export default function FormContainer(props) {
  const [errorInputs, setErrorInputs] = useState(false);

  const dispatch = useDispatch();
  const states = useSelector((state) => {
    return {
      name: state.name,
      email: state.email,
      password: state.password,
    };
  });

  function handleRequest(event) {
    event.preventDefault();

    for (let state in states) {
      if (states[state] === "") {
        return setErrorInputs(true);
      } else {
        setErrorInputs(false);
      }
    }

    if (errorInputs) {
      return;
    } else {
      dispatch(makeRequest());
    }
  }

  return (
    <form className={authStyles.formContainer}>
      <InputComponent types={props.types}></InputComponent>
      <button onClick={handleRequest}>{props.buttonText}</button>
    </form>
  );
}
