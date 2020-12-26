import authStyles from "../../../sass/auth.module.scss";
import {
  nameAction,
  passwordAction,
  emailAction,
} from "../../../actions/inputActions";
import { useDispatch } from "react-redux";

export default function InputComponent(props) {
  const dispatch = useDispatch();

  function setInputValueToState(event) {
    const input = event.target;
    switch (input.name) {
      case "name":
        dispatch(nameAction(input.value));
        break;
      case "email":
        dispatch(emailAction(input.value));
        break;
      case "password":
        dispatch(passwordAction(input.value));
        break;
    }
  }

  return props.types.map((el, index) => {
    return (
      <div key={index} className={authStyles.inputElement}>
        <input
          aria-label={el.name}
          name={el.name}
          minLength={el.name === "password" ? "8" : "3"}
          placeholder={el.placeholder}
          type={el.type}
          autoComplete={el.autoComplete}
          required={true}
          onChange={setInputValueToState}
        ></input>
        <i className="material-icons">{el.icon}</i>
      </div>
    );
  });
}
