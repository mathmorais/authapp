import Link from "next/link";
import profileStyles from "../../../sass/profile.module.scss";

export default function ProfileInfo(props) {
  return (
    <section className={profileStyles.profileInfoContainer}>
      <header className={profileStyles.infoHeader}>
        <div className={profileStyles.headerText}>
          <h1>Profile</h1>
          <p>Some info may be visible to other people</p>
        </div>
        <div className={profileStyles.editButton}>
          <Link href={"/edit"}>
            <button>Edit</button>
          </Link>
        </div>
      </header>
      <div className={profileStyles.infoRow}>
        <div className={profileStyles.rightSideContent}>
          <h2>Photo</h2>
        </div>
        <div className={profileStyles.leftSideContent}>
          <div className={profileStyles.profileIcon}></div>
        </div>
      </div>
      {props.WriteUserData()}
    </section>
  );
}
