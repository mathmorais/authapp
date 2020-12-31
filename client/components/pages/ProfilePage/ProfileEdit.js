import Link from "next/link";
import editProfileStyles from "../../../sass/edit.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function ProfileEdit() {
  const router = useRouter();
  const storageState = useSelector((state) => state.storage);
  const globalImageState = useSelector((state) => state.globalImageURL);

  const [fileErrors, setFileErrors] = useState({
    error: false,
    message: "",
  });
  const [fileMetaData, setFileMetaData] = useState({
    name: "",
    size: "",
  });
  const [inputFields, setInputFields] = useState({
    file: null,
    name: "",
    bio: "",
    phone: "",
  });

  useEffect(async () => {
    if (storageState) {
      const store = { ...storageState };
      setInputFields({ ...inputFields, ...store });
    }
  }, [storageState]);

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
          _id: userID,
          ...inputFields,
        })
        .then((res) => {
          if (res.data == "UPDATED") {
            router.push("/profile");
          }
        });
    }
  }

  // Pickup the input file data and set in a state
  async function handleInputImage(event) {
    setFileErrors({ error: false, message: "" });
    const inputFiles = event.target.files;

    if (inputFiles[0]) {
      if (handleError(inputFiles[0])) {
        return;
      }

      if (inputFiles && inputFiles.length > 0) {
        const data = inputFiles[0];
        setFileMetaData({
          name: data.name,
          size: data.size,
        });
        handleReaderCreation(data);
      } else {
        return;
      }
    }
  }

  function handleError(file) {
    if (file.size > 125000) {
      setFileErrors({
        error: true,
        message: "File exceeds the size limit",
      });
      return true;
    }
  }

  // Create file reader
  async function handleReaderCreation(data) {
    const reader = new FileReader();
    const dataOnBase64 = await convertBase64(reader, data);

    return setInputFields({
      ...inputFields,
      file: {
        dataB64: dataOnBase64,
      },
    });
  }

  // Convert file data to base64
  function convertBase64(reader, file) {
    const result = new Promise((res, rej) => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          res(reader.result);
        }
      };
    });
    return result;
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
            <div className={editProfileStyles.photoElement}>
              <img src={globalImageState}></img>
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
            <div className={editProfileStyles.infoContainer}>
              <p
                style={
                  fileErrors.error ? { color: "#eb5757" } : { color: "#828282" }
                }
              >
                {fileErrors.error
                  ? fileErrors.message
                  : fileMetaData.name !== ""
                  ? `${fileMetaData.name} / ${(
                      fileMetaData.size / 1000
                    ).toFixed(1)}kb`
                  : "Choose a photo"}
              </p>
              <div>
                <p>
                  Max supported file size / <strong>125kb</strong>
                </p>
              </div>
            </div>
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
            <button onClick={handleUpdate}>Save</button>
          </form>
        </section>
      </div>
    </main>
  );
}
