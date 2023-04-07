import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  //Fetching the Shop data from the JSON file and storing it in a Context.
  const [categoriesMap, setCategoriesMap] = useState({});

  // any async things we need to do, wrap it an async function rather than making the useEffect async
  useEffect(() => {
    // defining the function.
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    // invoking the function
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
