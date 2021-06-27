import * as React from "react";
import {connect} from 'react-redux'
import {getProduct} from "../redux/selectors";
import {Button, Callout, Intent, NonIdealState, Spinner} from "@blueprintjs/core";
import {useParams} from "react-router-dom";
import {fetchProduct} from "../redux/actions/product";
import {useEffect} from "react";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {STATUS_NOT_FOUND} from "../redux/reducers/product";


const Product = ({product, fetchProduct}) => {
    let {id} = useParams();
    useEffect(() => {
        fetchProduct(id)
    }, [])

    if (product.status === STATUS_LOADING) {
        return <section className="content">
            <Spinner/>
        </section>
    }

    if (product.status === STATUS_ERROR) {
        return <section className="content">
            <Callout title={"oops... something went wrong"} intent={Intent.DANGER}>
                {product.error}
            </Callout>
        </section>
    }

    if (product.status === STATUS_NOT_FOUND) {
        return <section className="content">
            <NonIdealState
                title={'Product not found'}
                icon={'search'}
                description={product.error}
            />
        </section>
    }

    return <section className="content">
        <img src={product.model.image} alt={product.model.title} width={100} height={100}/>
        <h1>{product.model.title}</h1>
        <p>{product.model.description}</p>
        <Button>Link to buy</Button>
    </section>
}

const mapStateToProps = state => {
    const product = getProduct(state);
    return {product};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (id) => dispatch(fetchProduct(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);