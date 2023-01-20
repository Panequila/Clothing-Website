import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
//Importing the SVG file as a Component
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navbar.styles.scss";

const NavigationBar = () => {
  return (
    //*Fragment is a Component that renders nothing, we use because of React's rules where a component must have a parent component.
    // It's useful if we don't want to render specific html elements like in the example below with the Outlet.
    //*Outlet renders the child route's element.
    //We are using it below to say: "Whenever we go to a children path, render this Component below the NavBar".
    //*Link is basically an anchor tag (a href)
    <Fragment>
      <div className="navbar">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo"></CrownLogo>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default NavigationBar;
