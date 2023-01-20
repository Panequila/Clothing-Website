import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navbar.component";


const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  return (
    //Using the Routes Component which is a parent to Route, that lets use multiple routes in our app.
    //When you match a Route with the "/" path value, render the Home Component. "/" is the base route.
    //index = true says when the path is "/", render the Home Component at the Outlet.
    //Nesting routes to make them relevant to each other. In order for the child to render it needs to have the parent URL/Path before its own.
    //By having the NavBar as the parent we can make it always visible.
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
