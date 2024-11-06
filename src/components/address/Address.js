import React from "react";
import { useEffect } from "react";
import { addAddress, fetchAddresses } from "../../common/Services/apiServices";
import {
  Button,
  FormHelperText,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import TextInput from "../../common/TextInput";
import * as yup from "yup";
import "./Address.css";
import Dropdown from "../../common/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { showNotification } from "../../common/Notification";
import { EMPTY } from "../../common/constants";
import { addressStyles } from "../../common/styles";

const Address = () => {
  const dispatch = useDispatch();
  const addressState = useSelector((state) => state.addresses);
  const { addresses, selectedAddress } = addressState;
  const { labelStyle } = addressStyles();
  const { userId } = jwtDecode(localStorage.getItem("token"));

  const formik = useFormik({
    initialValues: {
      name: EMPTY,
      contactNumber: EMPTY,
      street: EMPTY,
      city: EMPTY,
      state: EMPTY,
      landMark: EMPTY,
      zipCode: EMPTY,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required."),
      contactNumber: yup.string().required("Contact Number is required."),
      street: yup.string().required("Street is required."),
      city: yup.string().required("City is required."),
      state: yup.string().required("State is required."),
      zipCode: yup.number().required("Zip Code is required."),
    }),
    onSubmit: async (values) => {
      const payload = {
        id: EMPTY,
        name: values.name,
        contactNumber: values.contactNumber,
        street: values.street,
        city: values.city,
        state: values.state,
        landmark: values.landMark,
        zipcode: values.zipCode,
        user: userId,
      };
      const result = await addAddress(payload);
      if (result) {
        showNotification("Address has added successfully", "success");
        formik.resetForm();
        getAddresses();
      }
    },
  });

  const getAddresses = async () => {
    const response = await fetchAddresses(userId);
    if (response && response.length > 0)
      dispatch({ type: "ADDRESS_DETAILS", payload: response });
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const addressesOptions =
    addresses &&
    addresses.length > 0 &&
    addresses.map((address) => {
      const { name, street, city, state, zipcode } = address;
      return {
        label: `${name}, ${street}, ${city}, ${state}, ${zipcode}`,
        value: address,
      };
    });

  const handleChange = (data) => {
    dispatch({ type: "SELECTED_ADDRESS", payload: data ? data.value : EMPTY });
  };

  return (
    <Grid
      container
      direction="column"
      display="flex"
      alignSelf="center"
      flexDirection="column"
      justifyContent="center"
      justifyItems="center"
      flexGrow={1}
      paddingBottom="24px"
      alignItems="center"
    >
      <Grid
        item
        width="40%"
        display="flex"
        justifyContent="flex-start"
        marginBottom={4}
        flexDirection="column"
        alignItems="flex-start"
      >
        <FormHelperText className={labelStyle}>Select Address</FormHelperText>
        {addressesOptions && (
          <Dropdown
            options={addressesOptions}
            handleChange={handleChange}
            value={selectedAddress}
          />
        )}
      </Grid>
      <Grid item>
        <Typography variant="h5" marginTop={2}>
          Add Address
        </Typography>
      </Grid>
      <Grid
        item
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="20px"
        marginTop="18px"
        marginBottom="18px"
        width="30%"
      >
        <TextInput
          name="name"
          label="Name*"
          onChange={formik.handleChange}
          error={formik.errors.name}
          value={formik.values.name}
        />
        <TextInput
          name="contactNumber"
          label="Contact Number*"
          error={formik.errors.contactNumber}
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
        />
        <TextInput
          name="street"
          label="Street*"
          error={formik.errors.street}
          value={formik.values.street}
          onChange={formik.handleChange}
        />
        <TextInput
          name="city"
          label="City*"
          error={formik.errors.city}
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <TextInput
          name="state"
          label="State*"
          error={formik.errors.state}
          value={formik.values.state}
          onChange={formik.handleChange}
        />
        <TextInput
          name="landMark"
          label="Landmark"
          error={formik.errors.landMark}
          value={formik.values.landMark}
          onChange={formik.handleChange}
        />
        <TextInput
          name="zipCode"
          label="Zip Code*"
          error={formik.errors.zipCode}
          value={formik.values.zipCode}
          onChange={formik.handleChange}
        />
        <Button id="saveAddressBtn" onClick={formik.handleSubmit}>
          Save Address
        </Button>
      </Grid>
      {/* <Grid item justifyContent="center" display="flex" alignItems="flex-start">
        <Typography
          variant="body"
          sx={{
            color: "lightslategrey",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            paddingTop: "24px",
          }}
        >
          Copyright <CopyrightOutlinedIcon /> <span> upGrad </span> 2024
        </Typography>
      </Grid> */}
    </Grid>
  );
};
export default Address;
