import * as React from "react";
import ProductDetails from "./ProductDetails";
import StockList from "./StockList";
import {useHistory, useParams} from "react-router-dom";

const Product = () => {

    const history = useHistory();
    let {id} = useParams();

    return (
        <div className="content">
            <ProductDetails productId={id}/>
            <StockList productId={id}/>
        </div>
    );
}

export default Product