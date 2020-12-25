import Head from "next/head";
import AuthContainer from "../components/AuthContainer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Auth App</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
      </Head>
      <AuthContainer
        title="Join thousands of learners from around the world "
        content="Master web development by making real-life projects. There are multiple paths for you to choose"
        types={[
          {
            name: "Name",
            type: "text",
            icon: "account_box",
            autoComplete: "username",
          },
          {
            name: "Email",
            type: "email",
            icon: "email",
            autoComplete: "email",
          },
          {
            name: "Password",
            type: "password",
            icon: "lock",
            autoComplete: "current-password",
          },
        ]}
        buttonText={"Start coding now"}
        authPathName={"Login"}
        authPath={"/login"}
        authText={"Already a member? "}
      ></AuthContainer>
    </div>
  );
}
