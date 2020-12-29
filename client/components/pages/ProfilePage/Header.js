import Logo from "../../../public/images/devchallenges.svg";
import profileStyles from "../../../sass/profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setStorage } from "../../../actions/profileActions";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storageState = useSelector((state) => state);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (process.browser) {
      decodeLocalStorage();
    }
  }, []);

  // Decode the token from localStorage
  function decodeLocalStorage() {
    const storageToken = localStorage.getItem("token");
    axios.get(`http://localhost:4000/api/token/${storageToken}`).then((res) => {
      getUserData(res.data._id);
    });
  }

  // Get an User object from the ID of the Token decoded
  async function getUserData(id) {
    const userID = await id;
    try {
      axios.get(`http://localhost:4000/api/get/${userID}`).then((res) => {
        if (res.status === 200) {
          dispatch(setStorage(res.data));
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

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
            <Link href={"/profile"}>
              <div className={profileStyles.pathOptionsElement}>
                <i className="material-icons">group</i>
                <p>Group chat</p>
              </div>
            </Link>
          </div>
          <hr></hr>
          <div className={profileStyles.logoutButton}>
            <Link href={"/"}>
              <div
                onClick={() => localStorage.removeItem("token")}
                className={profileStyles.pathOptionsElement}
              >
                <i className="material-icons">exit_to_app</i>
                <p>Logout</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className={profileStyles.headerContainer}>
        <div className={profileStyles.logo}>
          <Logo></Logo>
        </div>
      </header>
    );
  }
}
