import Logo from "../../../public/images/devchallenges.svg";
import profileStyles from "../../../sass/profile.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const storageState = useSelector((state) => state);
  const [toggle, setToggle] = useState(false);

  if (storageState) {
    return (
      <header className={profileStyles.headerContainer}>
        <div className={profileStyles.logo}>
          <Logo></Logo>
        </div>
        <div className={profileStyles.profileIconContainer}>
          <div className={profileStyles.profileIcon}></div>
          <p>{storageState.name}</p>
          <i
            onClick={() => {
              setToggle(!toggle);
            }}
            className="material-icons"
          >
            {toggle ? "arrow_drop_up" : "arrow_drop_down"}
          </i>
        </div>
        <div
          className={
            toggle
              ? `${profileStyles.dropDownContainer} toggle`
              : `${profileStyles.dropDownContainer}`
          }
        >
          <div className={profileStyles.pathOptions}>
            <Link href={"/profile"}>
              <div className={profileStyles.pathOptionsElement}>
                <i className="material-icons">account_circle</i>
                <p>My Profile</p>
              </div>
            </Link>
            <Link href={"/"}>
              <div className={profileStyles.pathOptionsElement}>
                <i className="material-icons">group</i>
                <p>Group chat</p>
              </div>
            </Link>
          </div>
          <hr></hr>
          <div className={profileStyles.logoutButton}>
            <Link href={"/"}>
              <div className={profileStyles.pathOptionsElement}>
                <i className="material-icons">exit_to_app</i>
                <p>Logout</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  } else {
    return null;
  }
}
