import { async } from "@firebase/util";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/users.context";
import "./sign-up.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  //We get the setCurrentUser function from our Context, to set the "userContext" to the Signed Up User.
  //const {setCurrentUser} = useContext(UserContext);
  //Hooking to the context will make React run the all of code in here SignUpForm whenever the Context changes, 
  //which can be really bad if there are a lot of components hooked to the Cotnext.
  //const val = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSignUp = async (event) => {
    //We are saying that we don't want any default behavior to take place, we are gonna handle the event.
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      //setCurrentUser(user);

      //Create the UserDocument and pass it the displayName.
      await createUserDocumentFromAuth(user, { displayName });
      //Reset the form fields after SignUp.
      resetFormFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Cannot create user, email already exists");
      } else {
        console.log("User creation encountered an error!", error);
      }
    }
  };

  const handleChange = (event) => {
    //the evnet.target gives us all of the things that are attacked to the Input.
    const { name, value } = event.target;

    //The Spread/Rest Operator (...) updates every value in the Form not just the changed ones.
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have An Account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSignUp}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        ></FormInput>

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></FormInput>

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></FormInput>

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
