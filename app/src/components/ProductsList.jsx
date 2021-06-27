import * as React from "react";
import {useEffect} from "react";
import {connect} from 'react-redux'
import {getCategories, getLists, getProducts} from "../redux/selectors";
import ProductsListRow from "./ProductsListRow";
import {fetchProducts} from "../redux/actions/products";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {Callout, Intent, NonIdealState, Spinner} from "@blueprintjs/core";

const ProductsList = ({products, categories, lists, fetchProducts}) => {
    useEffect(() => {
        fetchProducts()
    }, [])

    if (products.status === STATUS_LOADING) {
        return <section className="content">
            <Spinner/>
        </section>
    }

    if (products.status === STATUS_ERROR) {
        return <section className="content">
            <Callout title={"oops... something went wrong"} intent={Intent.DANGER}>
                {products.error}
            </Callout>
        </section>

    }

    if (products.items.length === 0) {
        return <section className="content">
            <NonIdealState
                title={'No products found'}
                icon={'search'}
            />
        </section>
    }

    return <section className="content">
        {products.items.map(product => (
            <ProductsListRow key={product.id} product={product} categories={categories} lists={lists}/>
        ))}
    </section>
}

const mapStateToProps = state => {
    const products = getProducts(state);
    const categories = getCategories(state);
    const lists = getLists(state);

    return {products, categories, lists};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);