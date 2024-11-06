import React from "react";
import { useEffect, useState } from "react";
import { fetchCategories } from "./Services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { Grid2, ToggleButtonGroup } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import { ALL } from "./constants";

const Categories = () => {
  const categoryDetails = useSelector((state) => state.categories);
  const productDetails = useSelector((state) => state.productDetails);
  const { sortBy, searchItem } = productDetails;
  const { categories } = categoryDetails;
  const [category, setCategory] = useState(ALL);
  const dispatch = useDispatch();

  const getCategories = async () => {
    const response = await fetchCategories();
    if(response && response.length > 0) dispatch({ type: "UPDATE_CATEGORY_DETAILS", categories: response });
  };

  useEffect(() => {
      getCategories();
  }, []);

  const handleCategory = (event, newAlignment) => {
    setCategory(newAlignment || ALL);
    dispatch({ type: "UPDATE_FILTERED_PRODUCTS", filterType: newAlignment || ALL, sortBy: sortBy, searchItem: searchItem });
  };

  return (
    <Grid2
      container
      justifyItems="center"
      justifyContent="center"
      paddingTop="24px"
      paddingBottom="24px"
    >
      <ToggleButtonGroup
        value={category}
        exclusive
        onChange={handleCategory}
        aria-label="text alignment"
      >
        {[ALL,...categories].map((category) => (
          <ToggleButton value={category} key={category}>{category}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Grid2>
  );
};
export default Categories;
