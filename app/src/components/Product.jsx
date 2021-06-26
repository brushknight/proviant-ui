import * as React from "react";
import {connect} from 'react-redux'
import {getCategories, getLists} from "../redux/selectors";

// https://react-redux.js.org/tutorials/connect

const Product = ({categories, lists}) => {
    return <section className="content">
        <h1>Product</h1>
    </section>
}

const mapStateToProps = state => {
    const categories = getCategories(state);
    const lists = getLists(state);
    return {categories, lists};
};


export default connect(mapStateToProps)(Product);