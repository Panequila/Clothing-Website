import { useState, createContext, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//We can see the context as two pieces
//First: is the actual storage itself, which is the literal context that has the value of the user.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//Second: is the provider, the actual component. The .Provider is the component that will wrap around any other components
//that need access to the value of our context.
//The children are the nested components that require access to the user and so..
//The we wrap our <App> component between the <UserProvider> in index.js so that the whole app can access it.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //Instantiating a function but giving it an empty dependancy array. Which means we'll run it once only one this Compomemnt mounts.
  //Calling the onAuthStateChanged in the UserProvider as it ???? I really don't get this is it an infinite loop? like does the onAuth keep calling itself? IDK
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //Whenever the Auth State changes, set the currentUser value to the user.
      setCurrentUser(user);
    });

    //Unsubscribe whenver the Compoment Unmounts.
    return unsubscribe;
  }, []);

  //passing the value to the provider so that we can call the setter and getter of the user in any nested component.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
