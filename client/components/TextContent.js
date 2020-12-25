import authStyles from "../sass/auth.module.scss";

export default function TextContent(props) {
  return (
    <div className={authStyles.textContent}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
}
