import Head from "next/head";
import AuthContainer from "../components/AuthContainer";
export default function Login() {
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
        title="Login"
        content=" "
        types={[
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
        buttonText={"Login"}
        authPathName={"Register"}
        authPath={"/"}
        authText={"Don’t have an account yet? "}
      ></AuthContainer>
    </div>
  );
}
