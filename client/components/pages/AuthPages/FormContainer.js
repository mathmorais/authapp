import authStyles from "../../../sass/auth.module.scss";
import InputComponent from "./InputComponent";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../../actions/inputActions";

export default function FormContainer(props) {
  const dispatch = useDispatch();

  function handleRequest(event) {
    dispatch(makeRequest());
    event.preventDefault();
  }

  return (
    <form className={authStyles.formContainer}>
      <InputComponent types={props.types}></InputComponent>
      <button onClick={handleRequest}>{props.buttonText}</button>
    </form>
  );
}
