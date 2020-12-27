import profileStyles from "../../../sass/profile.module.scss";
import ProfileInfo from "./ProfileInfo";
import { useEffect, useState } from "react";
import { setStorage } from "../../../actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function ProfileMain(props) {
  const dispatch = useDispatch();
  const storageState = useSelector((state) => state);

  // Decode the token from localStorage
  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    axios.get(`http://localhost:4000/api/token/${storageToken}`).then((res) => {
      getUserData(res.data._id);
    });
  }, []);

  // Get an User object from the ID of the Token decoded
  async function getUserData(id) {
    const userID = await id;
    try {
      axios.get(`http://localhost:4000/api/get/${userID}`).then((res) => {
        if (res.status === 200) {
          dispatch(setStorage(res.data));
          return WriteUserData();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Write and show on screen the content of User object
  function WriteUserData() {
    if (storageState) {
      const userDataArray = parseAndFilter(storageState);
      return userDataArray.map((element, index) => {
        const objectKey = Object.keys(element);
        return (
          <div key={index} className={profileStyles.infoRow}>
            <div className={profileStyles.rightSideContent}>
              <h2>{objectKey}</h2>
            </div>
            <div className={profileStyles.leftSideContent}>
              <h1>{element[objectKey]}</h1>
            </div>
          </div>
        );
      });
    } else {
      return <h1>Loading</h1>;
    }
  }

  // parse user object to a iterable array
  function parseAndFilter(obj) {
    let array = [];
    for (let key in obj) {
      array.push({ [key]: obj[key] });
    }
    array = array.filter((el) => !el._id).slice(0, 4);
    return array;
  }

  return (
    <main className={profileStyles.profileMainContainer}>
      <div className={profileStyles.titleProfile}>
        <h1>Personal info</h1>
        <p>Basic info, like your name and photo</p>
      </div>
      <ProfileInfo WriteUserData={WriteUserData}></ProfileInfo>
    </main>
  );
}
