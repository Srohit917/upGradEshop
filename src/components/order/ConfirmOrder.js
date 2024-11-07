import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSelector } from "react-redux";
import { orderStyles } from "../../common/styles";
import './Order.css';
import Loader from "../../common/Loader";

const ConfirmOrder = () => {
  const productState = useSelector((state) => state.productDetails);
  const addressState = useSelector((state) => state.addresses);
  const { quantity, selectedProduct } = productState;
  const { name, category, description, price } = selectedProduct;
  const { selectedAddress } = addressState;
  const {
    city,
    contactNumber,
    landmark,
    name: addressName,
    street,
    state,
    zipcode,
  } = selectedAddress;
  const {
    cardStyle,
    productDetailContainer,
    cardContentStyle,
    addressContainer,
    productDescStyle,
    addressCardStyle,
  } = orderStyles();

  return (
    <Grid2>
      <Card className={cardStyle}>
        <Box className={productDetailContainer}>
          <CardContent className={cardContentStyle}>
            <Typography component="div" variant="h5" fontWeight={500}>
              {name}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Quantity: {quantity}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Category: <b className="categoryTextStyle">{category}</b>
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              id="descText"
              className={productDescStyle}
            >
              {description}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              alignItems="center"
              display="flex"
              color="red"
            >
              Total Price: <CurrencyRupeeIcon /> {quantity * price}
            </Typography>
          </CardContent>
        </Box>
        <Box className={addressContainer}>
          <CardContent className={addressCardStyle}>
            <Typography component="div" variant="h5" fontWeight={500}>
              Address Details:
            </Typography>
            <Typography variant="subtitle1" component="div">
              {addressName}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Contact Number: {contactNumber}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {street} {landmark} {city}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {state}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {zipcode}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Loader />
    </Grid2>
  );
};
export default ConfirmOrder;
