import authStyles from "../sass/auth.module.scss";

export default function FormContainer(props) {
  return (
    <form className={authStyles.formContainer}>
      {props.types.map((el, index) => {
        return (
          <div key={index} className={authStyles.inputElement}>
            <input
              aria-label={el.name}
              name={el.name}
              minLength={el.name === "Password" ? "8" : "3"}
              placeholder={el.name}
              type={el.type}
              autoComplete={el.autoComplete}
              required={true}
            ></input>
            <i className="material-icons">{el.icon}</i>
          </div>
        );
      })}
      <button>{props.buttonText}</button>
    </form>
  );
}
