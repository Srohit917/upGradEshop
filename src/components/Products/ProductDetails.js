import { Button, Grid2, Typography } from "@mui/material";
import NavigationBar from "../../navigation/NavigationBar";
import Categories from "../../common/Categories";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Product.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../common/Services/apiServices";
import { navigateTo } from "../../common/history";
import { imgStyle, productStyles } from "../../common/styles";
import { EMPTY } from "../../common/constants";

const ProductDetail = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { quantity } = productDetails;
  const [productDetail, setProductDetail] = useState();
  const { quantityField } = productStyles();

  const getProductDetails = async () => {
    const response = await fetchProductDetails(state.id);
    if (response) setProductDetail(response);
  };

  useEffect(() => {
    if (state && state.id) {
      getProductDetails();
    } else {
      navigateTo("/");
    }
  }, [state]);

  const onChange = (event) => {
    dispatch({ type: "UPDATE_QUANTITY", quantity: event.target.value });
  };

  return (
    <Grid2 display="flex" direction="column" flexDirection="column">
      <NavigationBar />
      <Categories />
      {productDetail && Object.keys(productDetail).length > 0 && (
        <Grid2
          marginLeft={32}
          marginRight={32}
          marginTop={12}
          display="flex"
          justifyContent="center"
          direction="row"
          gap={10}
          container
        >
          <Grid2 item>
            <img
              src={productDetail.imageUrl}
              alt={productDetail.name}
              style={imgStyle}
              loading="lazy"
            />
          </Grid2>
          <Grid2 item flex={1}>
            <Grid2
              display="flex"
              justifyContent="flex-start"
              flexDirection="row"
              alignItems="center"
              container
              gap={4}
            >
              <Typography variant="h4" className="productName">
                {productDetail.name}
              </Typography>
              <Grid2 className="availableQuantity">
                <Typography
                  variant="body"
                  className="availableItems"
                >{`Available Quantity:  ${productDetail.availableItems}`}</Typography>
              </Grid2>
            </Grid2>
            <Grid2 gap={3} display="flex" flexDirection="column" marginTop={4}>
              <Grid2
                item
                display="flex"
                justifyContent="flex-start"
                flexDirection="row"
                alignItems="center"
                gap={1}
              >
                <Typography variant="body">Category: </Typography>
                <Typography variant="body" fontWeight={600} className="categoryName">
                  {productDetail.category}
                </Typography>
              </Grid2>
              <Typography variant="body" fontStyle="italic">
                {productDetail.description}
              </Typography>
              <Typography variant="h4" className="price">
                <CurrencyRupeeIcon className="rupeeIcon" />{" "}
                {productDetail.price}
              </Typography>
              <TextField
                name="quantity"
                type="number"
                variant="outlined"
                label="Enter Quantity*"
                value={quantity}
                error={quantity == EMPTY}
                onChange={onChange}
                helperText={quantity == EMPTY ? "Min Quantity is 1" : EMPTY}
                className={quantityField}
              ></TextField>
              <Button
                id="orderBtn"
                onClick={() => {
                  dispatch({
                    type: "UPDATE_BUYING_PRODUCT",
                    payload: productDetail,
                  });
                  dispatch({ type: "SELECTED_ADDRESS", payload: {} });
                  navigateTo("/orderProduct");
                }}
              >
                Place Order
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};
export default ProductDetail;
