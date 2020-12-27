import Logo from "../../../public/images/devchallenges.svg";
import profileStyles from "../../../sass/profile.module.scss";

export default function Header(props) {
  return (
    <header className={profileStyles.headerContainer}>
      <div className={profileStyles.logo}>
        <Logo></Logo>
      </div>
      <div className={profileStyles.profileIconContainer}>
        <div className={profileStyles.profileIcon}></div>
        <p>Profile name</p>
        <i className="material-icons">arrow_drop_down</i>
      </div>
    </header>
  );
}
