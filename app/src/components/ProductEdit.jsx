import * as React from "react";
import ProductDetails from "./ProductDetails";
import StockList from "./StockList";
import {useParams} from "react-router-dom";
import ProductForm from "./ProductForm";

const ProductEdit = () => {

    return (
        <ProductForm type={'edit'}/>
    );
}

export default ProductEdit