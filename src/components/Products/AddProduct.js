import {
  Button,
  FormHelperText,
  Grid2 as Grid,
  Grid2,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useFormik } from "formik";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import * as yup from "yup";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import NavigationBar from "../../navigation/NavigationBar";
import TextInput from "../../common/TextInput";
import { productFormTheme, productStyles } from "../../common/styles";
import { addProduct, modifyProduct } from "../../common/Services/apiServices";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import "./Product.css";
import { showNotification } from "../../common/Notification";
import { EMPTY } from "../../common/constants";
import { navigateTo } from "../../common/history";
import Loader from "../../common/Loader";

const AddProduct = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const categoryDetails = useSelector((state) => state.categories);
  const { categories } = categoryDetails;
  const { shoppingCartIcon, footerStyle } = productStyles();

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, EMPTY),
  });

  const defaultOptions = categories.map((category) =>
    createOption(category.charAt(0).toUpperCase() + category.slice(1))
  );
  const [options, setOptions] = useState(defaultOptions);

  const initialValues = {
    name: state?.product?.name || EMPTY,
    category: state?.product?.category
      ? options.filter(
          (option) =>
            option.value.toLowerCase() ===
            state?.product?.category.toLowerCase()
        )[0].value
      : EMPTY || EMPTY,
    price: state?.product?.price || EMPTY,
    description: state?.product?.description || EMPTY,
    manufacturer: state?.product?.manufacturer || EMPTY,
    availableItems: state?.product?.availableItems || EMPTY,
    imageUrl: state?.product?.imageUrl || EMPTY,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("Product name is required."),
      category: yup.string().required("Category is required."),
      price: yup.string().required("Price is required."),
      description: yup.string().required("Description is required."),
      manufacturer: yup.string().required("Manufacturer is required."),
      availableItems: yup
        .number()
        .min(1)
        .required("Available Items is required."),
      imageUrl: yup.string().required("Image URL is required."),
    }),
    onSubmit: async (values) => {
      const productId = state?.product?.id;
      const currentDateTime = new Date().toISOString();
      const payload = {
        id: productId || EMPTY,
        name: values.name,
        category: values.category,
        price: values.price,
        description: values.description,
        manufacturer: values.manufacturer,
        availableItems: values.availableItems,
        imageUrl: values.imageUrl,
        lastUpdated: currentDateTime,
        dateCreated: values.dateCreated ?? currentDateTime
      };
      const result = productId
        ? await modifyProduct(productId, payload)
        : await addProduct(payload);
      if (result) {
        showNotification(
          `Product ${formik.values.name} ${
            productId ? "modified" : "added"
          } successfully`,
          "success"
        );
        formik.resetForm();
        navigateTo("/");
      }
    },
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      formik.setFieldValue("category", newOption.value);
    }, 1000);
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      minHeight: "48px",
      borderColor: formik.errors.category ? "red" : "hsl(0, 0%, 80%)",
    }),
  };

  return (
    <MuiThemeProvider theme={productFormTheme}>
      <Grid container direction="column">
        <Grid
          item
          display="flex"
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
        >
          <NavigationBar />
        </Grid>
        <Grid
          item
          width="30%"
          display="flex"
          alignSelf="center"
          flexDirection="column"
          justifyContent="center"
          justifyItems="center"
          flexGrow={1}
          paddingTop="24px"
          paddingBottom="24px"
        >
          <Grid
            item
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <AddShoppingCartIcon
              fontSize="medium"
              className={shoppingCartIcon}
            />
            <Typography variant="h5" marginTop={2}>
              {`${state?.product?.id ? "Modify" : "Add"} Product`}
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
          >
            <TextInput
              name="name"
              label="Product Name*"
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
            />
            <Grid2 width="100%">
              <FormHelperText
                variant="h5"
                fontSize="medium"
                className={formik.errors.category ? "categoryLabel" : EMPTY}
              >
                Category*
              </FormHelperText>
              <CreatableSelect
                isClearable
                styles={selectStyles}
                name="category"
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(option) => {
                  formik.setFieldValue(
                    "category",
                    option ? option.value : EMPTY
                  );
                }}
                onCreateOption={handleCreate}
                options={options}
                error={formik.errors.category}
                value={
                  options.filter(
                    (option) => option.value === formik.values.category
                  )[0]
                }
              />
              <FormHelperText variant="body" className="errorText">
                {formik.errors.category}
              </FormHelperText>
            </Grid2>
            <TextInput
              name="price"
              label="Price*"
              error={formik.errors.price}
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <TextInput
              name="description"
              label="Description*"
              error={formik.errors.description}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <TextInput
              name="manufacturer"
              label="Manufacturer*"
              error={formik.errors.manufacturer}
              value={formik.values.manufacturer}
              onChange={formik.handleChange}
            />
            <TextInput
              name="availableItems"
              label="Available Items*"
              error={formik.errors.availableItems}
              value={formik.values.availableItems}
              onChange={formik.handleChange}
            />
            <TextInput
              name="imageUrl"
              label="Image URL*"
              error={formik.errors.imageUrl}
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
            />
            <Button id="signUpBtn" onClick={formik.handleSubmit}>
              {`${state?.product?.id ? "Modify" : "Add"} Product`}
            </Button>
          </Grid>
          <Grid
            item
            justifyContent="center"
            display="flex"
            alignItems="flex-start"
          >
            <Typography variant="body" className={footerStyle}>
              Copyright <CopyrightOutlinedIcon /> <span> upGrad </span> 2024
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Loader />
    </MuiThemeProvider>
  );
};
export default AddProduct;
