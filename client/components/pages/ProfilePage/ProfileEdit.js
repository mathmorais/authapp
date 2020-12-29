import Link from "next/link";
import editProfileStyles from "../../../sass/edit.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function ProfileEdit() {
  const router = useRouter();
  const storageState = useSelector((state) => state);

  const [stateImage, setStateImage] = useState({
    file: null,
    name: "",
  });

  const [inputFields, setInputFields] = useState({ ...storageState });

  useEffect(async () => {
    if (storageState) {
      const store = { ...storageState };
      setInputFields({ ...store });
    }
  }, [storageState]);

  useEffect(() => {
    handleFileReader();
  }, [stateImage]);

  function handleInputValues(input) {
    return setInputFields({ ...inputFields, [input.id]: input.value });
  }

  function getInputData(event) {
    const input = event.target;
    handleInputValues(input);
  }

  // Update the data from database
  async function handleUpdate(event) {
    event.preventDefault();

    if (storageState) {
      const userID = await storageState.id;
      axios
        .post("http://localhost:4000/api/update", {
          id: userID,
          ...inputFields,
        })
        .then((res) => {
          if (res.data == "UPDATED") {
            router.push("/profile");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // Pickup the input file data and set in a state
  async function handleInputImage(event) {
    const inputFiles = event.target.files;
    if (inputFiles && inputFiles.length > 0) {
      const file = inputFiles[0];
      const name = inputFiles[0].name;
      setStateImage({ file, name });
    }
  }

  // Create a form data to storage a file
  function handleFileReader() {
    const formData = new FormData();

    if (stateImage.file) {
      formData.append("image", stateImage.file, stateImage.name);
      return setInputFields({ ...inputFields, file: formData });
    }
  }

  return (
    <main className={editProfileStyles.editContainer}>
      <Link href={"/profile"}>
        <div className={editProfileStyles.backPageLink}>
          <i className="material-icons">arrow_back_ios_new</i>
          <a>Back</a>
        </div>
      </Link>
      <div className={editProfileStyles.editBox}>
        <section className={editProfileStyles.editContent}>
          <header className={editProfileStyles.editHeader}>
            <h1>Change Info</h1>
            <p>Changes will be reflected to every services</p>
          </header>
          <div className={editProfileStyles.editPhoto}>
            <div
              style={
                stateImage.url
                  ? { backgroundImage: `url(${stateImage.url})` }
                  : { backgroundColor: "gray" }
              }
              className={editProfileStyles.photoElement}
            >
              <input
                id="uploadPhoto"
                type="file"
                onChange={handleInputImage}
                accept="image/*"
                style={{ display: "none" }}
              ></input>
              <label htmlFor="uploadPhoto">
                <div className={editProfileStyles.photoOverlay}>
                  <i className="material-icons">camera_alt</i>
                </div>
              </label>
            </div>
            <p>Change photo</p>
          </div>
          <form className={editProfileStyles.editInputs}>
            <label htmlFor="name">Name</label>
            <input
              onChange={getInputData}
              value={inputFields.name}
              placeholder="Enter your name..."
              id="name"
            ></input>

            <label htmlFor="bio">Bio</label>
            <textarea
              onChange={getInputData}
              value={inputFields.bio}
              placeholder="Enter your bio..."
              id="bio"
            ></textarea>

            <label htmlFor="phone">Phone</label>
            <input
              onChange={getInputData}
              value={inputFields.phone}
              placeholder="Enter your phone..."
              id="phone"
            ></input>

            {/* <label htmlFor="email">Email</label>
            <input
              onChange={getInputData}
              value={inputFields.email}
              type="email"
              placeholder="Enter your email..."
              autoComplete="current-email"
              id="email"
            ></input>

            <label htmlFor="password">Password</label>
            <input
              onChange={getInputData}
              value={inputFields.password}
              type="password"
              placeholder="Enter your new password..."
              autoComplete="current-password"
              id="password"
            ></input> */}
            <button onClick={handleUpdate}>Save</button>
          </form>
        </section>
      </div>
    </main>
  );
}
