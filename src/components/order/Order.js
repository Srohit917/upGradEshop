import { Button, Card, Grid2 } from "@mui/material";
import NavigationBar from "../../navigation/NavigationBar";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import "./Order.css";
import { useState } from "react";
import StepButton from "@mui/material/StepButton";
import Address from "../address/Address";
import { useDispatch, useSelector } from "react-redux";
import ConfirmOrder from "./ConfirmOrder";
import { placeOrder } from "../../common/Services/apiServices";
import { jwtDecode } from "jwt-decode";
import { showNotification } from "../../common/Notification";
import { navigateTo } from "../../common/history";
import { orderStyles } from "../../common/styles";
import ProductInfo from "../products/ProductInfo";

const OrderPage = () => {
  const steps = ["Items", "Select Address", "Confirm Order"];
  const [activeStep, setActiveStep] = useState(1);
  const dispatch = useDispatch();
  const addressState = useSelector((state) => state.addresses);
  const productState = useSelector((state) => state.productDetails);
  const { quantity, selectedProduct } = productState;
  const { selectedAddress } = addressState;
  const [completed, setCompleted] = useState({ [0]: true });
  const { stepperContainer, backButton, stepperLabelStyle } = orderStyles();

  const handleBack = () => {
    if (activeStep === 0) {
      dispatch({ type: "UPDATE_QUANTITY", quantity: 1 });
      navigateTo("/");
    }
    setCompleted((prevState) => ({
      ...prevState,
      [activeStep]: false,
      [activeStep - 1]: false,
    }));
    setActiveStep(activeStep - 1);
  };

  const handleNext = async () => {
    if (activeStep == 2) {
      const { userId } = jwtDecode(localStorage.getItem("token"));
      const payload = {
        id: "",
        quantity: quantity,
        user: userId,
        product: selectedProduct.id,
        address: selectedAddress.id,
      };
      const result = await placeOrder(payload);
      if (result) {
        showNotification("Order placed successfully!!!", "success");
        navigateTo("/");
      }
    } else if(activeStep == 1) {
      if (selectedAddress && Object.keys(selectedAddress).length > 0) {
        setCompleted((prevState) => ({
          ...prevState,
          [activeStep]: true,
        }));
        setActiveStep(activeStep + 1);
      } else {
        showNotification("Please Select Address", "error");
      }
    } else {
      setCompleted((prevState) => ({
        ...prevState,
        [activeStep]: true,
      }));
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Grid2>
      <NavigationBar />
        <Box className={stepperContainer}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" className={stepperLabelStyle}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
      </Box>
      {activeStep == 1 ? <Address /> : activeStep == 2 ? <ConfirmOrder /> : <ProductInfo id={selectedProduct?.id} />}
      <Box className={backButton}>
        <Button
          color="inherit"
          // disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" className="nextBtn">
          {activeStep == 2 ? "Place Order" : "Next"}
        </Button>
      </Box>
    </Grid2>
  );
};
export default OrderPage;
