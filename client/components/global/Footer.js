import authStyles from "../../sass/auth.module.scss";

export default function Footer(props) {
  const options = {
    width: props.width,
    maxWidth: props.maxWidth,
    minWidth: props.minWidth,
  };

  return (
    <footer style={{ ...options }} className={authStyles.footerContainer}>
      <p>mathmorais</p>
      <p>@devchallenges.io</p>
    </footer>
  );
}
