import * as React from "react";
import ProductDetails from "./ProductDetails";
import StockList from "./StockList";
import {useParams} from "react-router-dom";

const Product = () => {

    let {id} = useParams();

    return (
        <div className="content">
            <ProductDetails productId={id}/>
            <StockList productId={id}/>
        </div>
    );
}

export default Product