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
          <button>Edit</button>
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
      <div className={profileStyles.infoRow}>
        <div className={profileStyles.rightSideContent}>
          <h2>Name</h2>
        </div>
        <div className={profileStyles.leftSideContent}>
          <h1>Profile Name</h1>
        </div>
      </div>
      <div className={profileStyles.infoRow}>
        <div className={profileStyles.rightSideContent}>
          <h2>Bio</h2>
        </div>
        <div className={profileStyles.leftSideContent}>
          <h1>I am a software developer and a big fan of devchallenges...</h1>
        </div>
      </div>
      <div className={profileStyles.infoRow}>
        <div className={profileStyles.rightSideContent}>
          <h2>Phone</h2>
        </div>
        <div className={profileStyles.leftSideContent}>
          <h1>908249274292</h1>
        </div>
      </div>
      <div className={profileStyles.infoRow}>
        <div className={profileStyles.rightSideContent}>
          <h2>Email</h2>
        </div>
        <div className={profileStyles.leftSideContent}>
          <h1>xanthe.neal@gmail.com</h1>
        </div>
      </div>
      <div className={profileStyles.infoRow}>
        <div className={profileStyles.rightSideContent}>
          <h2>Password</h2>
        </div>
        <div className={profileStyles.leftSideContent}>
          <h1>************</h1>
        </div>
      </div>
    </section>
  );
}
