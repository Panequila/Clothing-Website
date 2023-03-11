import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//Browser Router is the generic router. It enables and keeps track of the history of the navigations. There are other forms routers but I'll be using this one.
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/users.context";
import { ProductProvider } from "./contexts/products.context";
import { CartProvider } from "./contexts/cart.context";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Making the BrowserRouter the parent of our whole application so we can access all of its features(routing) inside our app. 
    The same works when using React Context, it allows nested children to access the functions and data of the parents. */}
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
