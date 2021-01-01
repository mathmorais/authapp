import Logo from "../../../public/images/devchallenges-light.svg";
import profileStyles from "../../../sass/profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setStorage } from "../../../actions/profileActions";
import { setImageUrl } from "../../../actions/globalImageAction";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Header() {
  const dispatch = useDispatch();
  const storageState = useSelector((state) => state.storage);
  const globalImageState = useSelector((state) => state.globalImageURL);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (process.browser) {
      decodeLocalStorage(getUserData);
    }
  }, []);

  useEffect(() => {
    generateProfileImageURL();
  }, [storageState]);

  // Decode the token from localStorage
  function decodeLocalStorage(callback) {
    const storageToken = localStorage.getItem("token");
    axios
      .get(`http://192.168.0.13:4000/api/token/${storageToken}`)
      .then((res) => {
        callback(res.data._id);
      });
  }

  // Get an User object from the ID of the Token decoded
  async function getUserData(id) {
    const userID = await id;

    axios.get(`http://192.168.0.13:4000/api/get/${userID}`).then((res) => {
      if (res.status === 200) {
        delete res.data.password;
        dispatch(setStorage({ ...res.data, url: "" }));
      }
    });
  }

  async function generateProfileImageURL() {
    if (storageState && storageState.file) {
      if (!globalImageState) {
        const imagedata = await storageState.file.dataB64;
        const blob = await createBlobFromData(imagedata);
        const url = URL.createObjectURL(blob);
        dispatch(setImageUrl(url));
      } else {
        return globalImageState;
      }
    }
  }

  function createBlobFromData(data) {
    const result = new Promise((resolve, reject) => {
      fetch(data).then((res) => {
        if (res) {
          return resolve(res.blob());
        } else {
          return reject();
        }
      });
    });
    return result;
  }

  if (storageState) {
    return (
      <header className={profileStyles.headerContainer}>
        <div className={profileStyles.logo}>
          <Logo></Logo>
        </div>
        <div className={profileStyles.profileIconContainer}>
          <img
            src={globalImageState}
            className={profileStyles.profileIcon}
          ></img>
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
