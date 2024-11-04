import { Grid2 } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const productState = useSelector((state) => state.productDetails);
  const addressState = useSelector((state) => state.addresses);
  const { quantity, selectedProduct } = productState;
  const { name, category, description, price } = selectedProduct;
  const { selectedAddress } = addressState;
  const {city, contactNumber, landmark, name: addressName, street, state, zipcode } = selectedAddress;

  return (
    <Grid2>
      <Card sx={{ display: "flex", marginLeft: 12, marginRight: 12, marginTop: 6, marginBottom: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              Quantity: {quantity}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              Category: <b>{category}</b>
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary", fontStyle: "italic" }}
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
        <Box sx={{ display: "flex", flexDirection: "column", borderLeft: "1.5px solid lightgrey", flex: 0.5 }}>
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography component="div" variant="h5">
              Address Details:
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              {addressName}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              Contact Number: {contactNumber}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              {street} {landmark} {city}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              {state}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
            >
              {zipcode}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid2>
  );
};
export default ConfirmOrder;
