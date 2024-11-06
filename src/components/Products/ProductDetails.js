import { Fragment } from "react";
import NavigationBar from "../../navigation/NavigationBar";
import Categories from "../../common/Categories";
import { useLocation } from "react-router-dom";
import ProductInfo from "./ProductInfo";

const ProductDetail = () => {
    const { state } = useLocation();

    return (
        <Fragment>
             <NavigationBar />
             <Categories />
             <ProductInfo id={state?.id}/>
        </Fragment>
    )
}
export default ProductDetail;