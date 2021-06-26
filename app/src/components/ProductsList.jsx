import * as React from "react";
import {connect} from 'react-redux'
import {getCategories, getLists, getProducts} from "../redux/selectors";
import ProductsListRow from "./ProductsListRow";
import {MenuItem} from "@blueprintjs/core";

// https://react-redux.js.org/tutorials/connect

const ProductsList= ({products, categories, lists}) => {
    return <section className="content">
        {products.map(product => (
        <ProductsListRow key={product.id} product={product} categories={categories} lists={lists}/>
        ))}
    </section>
}

const mapStateToProps = state => {
    const products = getProducts(state);
    const categories = getCategories(state);
    const lists = getLists(state);
    return { products, categories, lists };
};


export default connect(mapStateToProps)(ProductsList);