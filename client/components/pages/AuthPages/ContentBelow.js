import authStyles from "../../../sass/auth.module.scss";
import FacebookLogo from "../../../public/images/Facebook.svg";
import GoogleLogo from "../../../public/images/Google.svg";
import Link from "next/link";

export default function ContentBelow(props) {
  return (
    <section className={authStyles.contentBelow}>
      <p>or continue with these social profile</p>
      <div className={authStyles.alternativeLogins}>
        <FacebookLogo></FacebookLogo>
        <GoogleLogo></GoogleLogo>
      </div>
      <p>
        {props.authText}
        <Link href={props.authPath}>{props.authPathName}</Link>
      </p>
    </section>
  );
}
