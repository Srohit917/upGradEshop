import { FormHelperText, Grid2 } from "@mui/material";
import { useState } from "react";
import "./Common.css";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { DEFAULT } from "./constants";

const Sorting = () => {
  const [sortBy, setSortBy] = useState(DEFAULT);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { filterType, searchItem } = productDetails;
  
  const handleChange = (data) => {
    setSortBy(data.value);
    dispatch({ type: "UPDATE_FILTERED_PRODUCTS", filterType: filterType, sortBy: data.value, searchItem: searchItem });
  };

  const options = [
    { label: "Default", value: "default" },
    { label: "Price: High to Low", value: "hToL" },
    { label: "Price: Low to High", value: "lToH" },
    { label: "Newest", value: "newest" },
  ];

  return (
    <Grid2
      container
      paddingBottom={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Grid2 item width="40%">
        <FormHelperText className="sortByText">Sort By:</FormHelperText>
        <Dropdown options={options} handleChange={handleChange} value={sortBy} />
      </Grid2>
    </Grid2>
  );
};
export default Sorting;
