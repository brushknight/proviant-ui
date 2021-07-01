import * as React from "react";
import ProductDetails from "./ProductDetails";
import StockList from "./StockList";
import {useParams} from "react-router-dom";
import ProductForm from "./ProductForm";

const ProductCreate = () => {

    return (
        <ProductForm type={'create'}/>
    );
}

export default ProductCreate