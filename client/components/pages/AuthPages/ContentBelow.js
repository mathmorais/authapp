import authStyles from "../../../sass/auth.module.scss";
import Link from "next/link";

export default function ContentBelow(props) {
  return (
    <section className={authStyles.contentBelow}>
      <p>
        {props.authText}
        <Link href={props.authPath}>{props.authPathName}</Link>
      </p>
    </section>
  );
}
