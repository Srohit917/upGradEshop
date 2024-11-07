import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../common/Services/apiServices";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import './Product.css'
import { showNotification } from "../../common/Notification";
import { navigateTo } from "../../common/history";
import { productStyles } from "../../common/styles";

const Products = () => {
  const productDetails = useSelector((state) => state.productDetails);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const { filterProducts } = productDetails;
  const { isAdmin } = userDetails;
  const[showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [product, setProduct] = useState({});
  const { productCardStyle, productImage, deleteConfirmation, cardContentStyle, productNameStyle, productDescStyle, cardActions, buyBtnStyle } = productStyles();

  const getProducts = async () => {
    const response = await fetchProducts();
    if(response && response.length>0) dispatch({ type: "UPDATE_PRODUCT_DETAILS", products: response });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleOnConfirm = async () => {
    setShowDeleteConfirmationDialog(false);
    const deleteResponse = await deleteProduct(product.id);
    if(deleteResponse) {
      setProduct({});
      getProducts();
      showNotification(`Product ${product.name} deleted successfully`, "success");
    }
  }

  const handleOnCancel = () => {
    setShowDeleteConfirmationDialog(false);
    setProduct({});
  }

  return (
    <Grid2 container spacing={3} paddingRight={24} paddingLeft={24} gap={6} justifyContent="center">
      {filterProducts && filterProducts.length > 0 ? 
        filterProducts.map((product) => (
          <Card
            className={productCardStyle}
            key={product.id}
          >
            <CardMedia
              component="img"
              alt={product.name}
              image={product.imageUrl}
              className={productImage}
            />
            <CardContent className={cardContentStyle}>
              <Grid2
                spacing={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={productNameStyle}
                >
                  {product.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  alignItems="center"
                  display="flex"
                >
                  <CurrencyRupeeIcon /> {product.price}
                </Typography>
              </Grid2>
              <Typography
                variant="body2"
                className={productDescStyle}
              >
                {product.description}
              </Typography>
            </CardContent>
            <CardActions
              className={cardActions}
            >
              <Grid2 justifyContent="flex-end">
                <Button
                  size="small"
                  variant="contained"
                  className={buyBtnStyle}
                  onClick={() =>
                    navigateTo("/productDetail", {
                      state: {
                        id: product.id,
                      },
                    })
                  }
                >
                  Buy
                </Button>
              </Grid2>
              {isAdmin && (
                <Grid2
                  justifyContent="flex-end"
                  display="flex"
                  flexDirection="row"
                  alignItems="flex-end"
                  flex={1}
                  gap={1}
                >
                  <IconButton aria-label="edit" size="medium" onClick={() =>
                    navigateTo("/addProduct", {
                      state: {
                        product: product,
                      },
                    })
                  }>
                    <ModeEditIcon fontSize="medium" />
                  </IconButton>
                  <IconButton aria-label="delete" size="medium" onClick={()=> {
                    setShowDeleteConfirmationDialog(true)
                    setProduct(product)
                  }}>
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Grid2>
              )}
            </CardActions>
          </Card>
        )) : <h3>No products have added.</h3>
      }
      <Dialog
        open={showDeleteConfirmationDialog}
        onClose={handleOnCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={deleteConfirmation}
      >
        <DialogTitle id="alert-dialog-title">
          Confirm deletion of product!
        </DialogTitle>
        <DialogContent className="dialogContent">
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnConfirm} variant="contained" className="okBtn">Ok</Button>
          <Button onClick={handleOnCancel} variant="outlined" className="cancelBtn">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};
export default Products;
