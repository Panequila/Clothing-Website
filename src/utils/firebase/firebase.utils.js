//gets all of the services we need from firebase
// The /app Library abstracts some of the functionality (CRUD) we need to use in our Firebase.
import { initializeApp } from "firebase/app";

//Importing all of the authentication services we're gonna be using.
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

//A Document is basically the Data, we have to create an instance of it retrieve and update the data inside of our database.
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// This config identifies the app we want to connect to the firebase (clothing-app)
const firebaseConfig = {
  apiKey: "AIzaSyABGaL71GFgO798EYH03m75ok9j6qQZP2g",
  authDomain: "clothing-app-db-708a6.firebaseapp.com",
  projectId: "clothing-app-db-708a6",
  storageBucket: "clothing-app-db-708a6.appspot.com",
  messagingSenderId: "140276412617",
  appId: "1:140276412617:web:82ba24c83461618b179d18",
};

// Initialize Firebase and create an instance of it and connecting it to our website.
const firebaseApp = initializeApp(firebaseConfig);

//GoogleAuthProvider is a class that we get from firebase authentication.
//We are creating an instance of it because we could use multiple different providers later on, like one for pop and one for redirect.
const googleProvider = new GoogleAuthProvider();

//Everytime someone interacts with the provider, they must select an account.
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//When doing authentication, we don't use the "New" keyword because there can only be one instance.
//Authentication is a Singleton, it keeps track of the authentication state of the entire app. The user will log in only once.
export const auth = getAuth();

//A reference to our firestore (database).
export const db = getFirestore();

//Exporting the Signing In function because we'll use it at the signin.component
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};
export const signInWithGoogleRedirect = () => {
  return signInWithRedirect(auth, googleProvider);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  //Calling the imported createUserWithEmailAndPassword.
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  //Calling the imported createUserWithEmailAndPassword.
  return await signInWithEmailAndPassword(auth, email, password);
};

//This creates the user that we signed in with above, in the actual Firestore database.
//the signInWithGooglePopup func above handles the sign in only without adding the signed user to the database.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  //The document reference (the firestore reference, the table, the user id)
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  //Getting a snapshot "data" of the document reference. This gives the same data that the doc reference returns,
  //but it creates the data in a special object which we can perform operations on like "exists();" to check if the user is already in the database.
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  //Adding the user to the database
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        //when the user is created using the GoogleProvider Method "SignInWithGoogle", the displayName is added automatically.
        //but when it's created using the "createUserWithEmailAndPassword", this displayedName is Null, so we have to added by passing it as AdditionalInformation.
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
