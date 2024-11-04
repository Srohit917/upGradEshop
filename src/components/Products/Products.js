import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, fetchProducts } from "../../common/Services/apiServices";
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
import { useNavigate } from "react-router-dom";
import './Product.css'
import { showNotification } from "../../common/Notification";

const Products = () => {
  const productDetails = useSelector((state) => state.productDetails);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterProducts } = productDetails;
  const { isAdmin } = userDetails;
  const[showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [product, setProduct] = useState({});

  const getProducts = async () => {
    const response = await fetchProducts();
    if(response && response.length>0) dispatch({ type: "UPDATE_PRODUCT_DETAILS", products: response });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleOnConfirm = async () => {
    const deleteResponse = await deleteRequest(`http://localhost:8080/api/products/${product.id}`);
    console.log("deleteResponse.. ", deleteResponse);
    if(deleteResponse == "deleted") {
      showNotification(`Product ${product.name} deleted successfully`, "success");
      setProduct({});
      setShowDeleteConfirmationDialog(false);
      getProducts();
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
            sx={{
              width: 420,
              height: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            key={product.id}
          >
            <CardMedia
              component="img"
              alt={product.name}
              image={product.imageUrl}
              sx={{
                objectFit: "cover",
                height: 320,
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
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
                  sx={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                  }}
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
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid2 justifyContent="flex-end">
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#3f51b5",
                  }}
                  onClick={() =>
                    navigate("/productDetail", {
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
                    navigate("/addProduct", {
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
        sx={{ '& .MuiDialog-paper': { width: '30%', maxHeight: 460, height: 200 } }}
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
