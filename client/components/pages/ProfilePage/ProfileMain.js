import profileStyles from "../../../sass/profile.module.scss";
import ProfileInfo from "./ProfileInfo";
import { useSelector } from "react-redux";
export default function ProfileMain() {
  const storageState = useSelector((state) => state.storage);

  // Write and show on screen the content of User object
  function WriteUserData() {
    if (storageState) {
      const copyStorageState = { ...storageState };
      const userDataArray = parseArray(copyStorageState);
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
  function parseArray(obj) {
    let array = [];

    delete obj.url;

    for (let key in obj) {
      array.push({ [key]: obj[key] });
    }

    array = array.filter((el) => {
      return !el._id && !el.file;
    });

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
