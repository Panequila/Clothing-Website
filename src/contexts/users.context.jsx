import { useState, createContext } from "react";

//We can see the context as two pieces
//First: is the actual storage itself, which is the literal context that has the value of the user.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

//Second: is the provider, the actual component. The .Provider is the component that will wrap around any other components
//that need access to the value of our context. 
//The children are the nested components that require access to the user and so..
//The we wrap our <App> component between the <UserProvider> in index.js so that the whole app can access it.
export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    //passing the value to the provider so that we can call the setter and getter of the user in any nested component.
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}