import * as React from "react";
import ProductDetails from "./ProductDetails";
import StockList from "./StockList";

class Product extends React.Component {
    render() {
        return (
            <div className="content">
                <ProductDetails/>
                <StockList/>
            </div>
        );
    }
}

export default Product