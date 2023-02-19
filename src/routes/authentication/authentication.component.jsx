// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

// import {
//   auth,
//   signInWithGooglePopup,
//   signInWithGoogleRedirect,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils.js";

import SignUpForm from "../../components/sign-up/sign-up.component.jsx";
import SignInForm from "../../components/sign-in/sign-in.component.jsx";
import "./authentication.styles.scss";

const Authentication = () => {
  //   //Redirecting is different than a Popup, with redirecting we have to use GetRedirectResult because it takes us to another page and the data gets lost
  //   //when we go back to our website.
  //   useEffect(() => {
  //     getRedirectResult(async () => {
  //       const response = await getRedirectResult(auth);
  //       console.log(response);
  //       if (response) {
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     });
  //   }, []);

  //   const logGoogleRedirectUser = async () => {
  //     //Getting the user object and its children from the returned values of the function.
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log(user);
  //     //const userDocRef = await createUserDocumentFromAuth(user);
  //   };

  //Whenever you make a call to the database, it's going to be asynchronous.

  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </div>
  );
};
export default Authentication;
