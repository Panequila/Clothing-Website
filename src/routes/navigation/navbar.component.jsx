import { signOutUser } from "../../utils/firebase/firebase.utils";
import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

//Importing the SVG file as a Component
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/users.context";
import { CartContext } from "../../contexts/cart.context";

import "./navbar.styles.scss";

const NavigationBar = () => {
  //In the nav bar we need to find out if there is a user signed in or not, so we fetch the "currentUser" object in the Context class.
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return (
    //*Fragment is a Component that renders nothing, we use because of React's rules where a component must have a parent component.
    // It's useful if we don't want to render specific html elements like in the example below with the Outlet.

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

          {/* If there is a signed in user then render "SignOut", if not then render "SignIn". */}
          {currentUser ? (
            <Link className="nav-link" onClick={signOutUser}>
              Sign Out
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
          <CartIcon></CartIcon>
        </div>
        {/* If both values are true do this line. This renders the CartDropDown accordingly */}
        {isCartOpen && <CartDropDown/>}
      </div>
      {/* Outlet renders the child routes element.
      We are using it below to say: "Whenever we go to a child path, render this Component below the NavBar". */}
      <Outlet></Outlet>
    </Fragment>
  );
};

export default NavigationBar;
