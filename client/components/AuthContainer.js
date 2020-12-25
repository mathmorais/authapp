import authStyles from "../sass/auth.module.scss";
import FormContainer from "./FormContainer";
import Logo from "../public/images/devchallenges.svg";
import ContentBelow from "./ContentBelow";
import TextContent from "./TextContent";

export default function AuthContainer(props) {
  return (
    <main className={authStyles.loginContainer}>
      <div className={authStyles.logo}>
        <Logo></Logo>
      </div>
      <TextContent title={props.title} content={props.content}></TextContent>
      <FormContainer
        types={props.types}
        buttonText={props.buttonText}
      ></FormContainer>
      <ContentBelow
        authText={props.authText}
        authPathName={props.authPathName}
        authPath={props.authPath}
      ></ContentBelow>
    </main>
  );
}
