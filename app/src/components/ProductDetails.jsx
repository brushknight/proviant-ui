import * as React from "react";
import {connect} from 'react-redux'
import {getProduct} from "../redux/selectors";
import {Button, ButtonGroup, Callout, Intent, NonIdealState, Spinner, Tag} from "@blueprintjs/core";
import {deleteProduct, fetchProduct} from "../redux/actions/product";
import {useEffect} from "react";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {STATUS_NOT_FOUND} from "../redux/reducers/product";
import {useHistory} from "react-router-dom";
import {STATUS_SUCCESS} from "../redux/reducers/consts";

const ProductDetails = ({productId, product, fetchProduct, deleteProduct}) => {
    const history = useHistory();

    useEffect(() => {
        fetchProduct(productId)
    }, [productId])

    if (product.deleteStatus === STATUS_SUCCESS){
        history.push("/");
    }

    if (product.status === STATUS_LOADING) {
        return <section >
            <Spinner/>
        </section>
    }

    if (product.status === STATUS_ERROR) {
        return <section >
            <Callout title={"oops... something went wrong"} intent={Intent.DANGER}>
                {product.error}
            </Callout>
        </section>
    }

    if (product.status === STATUS_NOT_FOUND) {
        return <section >
            <NonIdealState
                title={'Product not found'}
                icon={'search'}
                description={product.error}
            />
        </section>
    }

    let onEditHandler = () => {
        history.push("/product/" + product.model.id + "/edit");
    }

    let productListTag

    if (product.model.list) {
        productListTag = <Tag>{product.model.list.title}</Tag>
    }

    let productCategoriesTags
    if (product.model.categories) {
        productCategoriesTags = product.model.categories.map((item) => {
            return <Tag>{item.title}</Tag>
        })
    }

    return <section>
        <ButtonGroup>
            <Button icon={'edit'} minimal={true} onClick={onEditHandler}>Edit product</Button>
            <Button onClick={() => {deleteProduct(productId)}} icon={'delete'} minimal={true} intent={Intent.DANGER}>Delete product</Button>
        </ButtonGroup>
        <img src={product.model.image} alt={product.model.title} width={100} height={100}/>
        <h1>{product.model.title}</h1>
        <p>{product.model.description}</p>
        <p><Tag minimal={true}>Barcode</Tag>{product.model.barcode}</p>
        <p>List {productListTag}</p>
        <p>Categories {productCategoriesTags}</p>
        <Button onClick={() => {
            if (product.model.link){
                window.open(product.model.link);
            }
        }}>Link to buy</Button>
    </section>
}

const mapStateToProps = (state, ownProps) => {
    const product = getProduct(state);
    const productId = ownProps.productId
    return {productId, product};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (id) => dispatch(fetchProduct(id)),
        deleteProduct: (id) => dispatch(deleteProduct(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);