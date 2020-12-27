import profileStyles from "../../../sass/profile.module.scss";
import ProfileInfo from "./ProfileInfo";

export default function ProfileMain(props) {
  return (
    <main className={profileStyles.profileMainContainer}>
      <div className={profileStyles.titleProfile}>
        <h1>Personal info</h1>
        <p>Basic info, like your name and photo</p>
      </div>
      <ProfileInfo></ProfileInfo>
    </main>
  );
}
