import * as React from "react";
import {useEffect} from "react";
import {connect} from 'react-redux'
import {getCategories, getLists, getProduct} from "../redux/selectors";
import {
    Button,
    ButtonGroup,
    Callout,
    EditableText,
    InputGroup,
    Intent,
    NonIdealState,
    Spinner,
    Tag
} from "@blueprintjs/core";
import {useHistory, useParams} from "react-router-dom";
import {changeProductField, createProduct, fetchProduct, resetProduct, updateProduct} from "../redux/actions/product";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {
    PRODUCT_FIELD_BARCODE,
    PRODUCT_FIELD_CATEGORIES,
    PRODUCT_FIELD_DESCRIPTION,
    PRODUCT_FIELD_IMAGE,
    PRODUCT_FIELD_LINK,
    PRODUCT_FIELD_LIST,
    PRODUCT_FIELD_TITLE,
    STATUS_NOT_FOUND
} from "../redux/reducers/product";
import Select from 'react-select'

const ProductEdit = ({product, lists, categories, fetchProduct, updateProduct, createProduct, resetProduct, change}) => {
    const history = useHistory();
    let {id} = useParams();

    if (id == null){
        id = 'new'
    }

    useEffect(() => {
        if (isNaN(Number(id))) {
            resetProduct()
        }else{
            fetchProduct(id)
        }

    }, [id])

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

    let onCancelHandler = () => {
        history.push("/product/" + product.model.id);
    }

    const textLinkToShop = <Tag minimal={true}>Link to shop</Tag>;
    const textLinkToPicture = <Tag minimal={true}>Link to picture</Tag>;
    const textBarcode = <Tag minimal={true}>Barcode</Tag>;

    let controls = []

    if (product.model.id > 0) {
        controls.push(<Button icon={'tick'} minimal={true} onClick={() => {
            updateProduct(product.model)
        }} intent={Intent.SUCCESS}>Save</Button>)
        controls.push(<Button icon={'undo'} minimal={true} onClick={onCancelHandler}>Cancel</Button>)
    } else {
        controls.push(<Button icon={'tick'} minimal={true} onClick={() => {
            createProduct(product.model)
        }} intent={Intent.SUCCESS}>save new product</Button>)
    }

    let convertListToValue = (model) => {
        return {value: model.id, label: model.title}
    }

    let convertCategoryToValue = (model) => {
        return {value: model.id, label: model.title}
    }

    let listsForSelect = lists.items.map((item) => {
        return convertListToValue(item)
    })

    let categoriesForSelect = categories.items.map((item) => {
        return convertCategoryToValue(item)
    })

    let categoriesSelected = []

    if (product.model.categories != null) {
        categoriesSelected = product.model.categories.map((item) => {
            return convertCategoryToValue(item)
        })
    }


    return <section className="content">
        <ButtonGroup>
            {controls}

        </ButtonGroup>
        <img src={product.model.image} alt={product.model.title} width={100} height={100}/>
        <h1>
            <EditableText
                multiline={false}
                minLines={1}
                maxLines={1}
                value={product.model.title}
                onChange={(value) => {
                    change.title(value)
                }}
            />
        </h1>
        <EditableText
            multiline={true}
            minLines={3}
            maxLines={100}
            value={product.model.description}
            onChange={(value) => {
                change.description(value)
            }}
        />
        <InputGroup
            fill={true}
            leftElement={textLinkToShop}
            value={product.model.link}
            onChange={(event) => {
                change.link(event.target.value)
            }}
        />
        <InputGroup
            fill={true}
            leftElement={textLinkToPicture}
            value={product.model.image}
            onChange={(event) => {
                change.image(event.target.value)
            }}
        />
        <InputGroup
            fill={true}
            leftElement={textBarcode}
            value={product.model.barcode}
            onChange={(event) => {
                change.barcode(event.target.value)
            }}
        />
        <Select
            options={listsForSelect}
            isMulti={false}
            placeholder={'select list'}
            onChange={(event) => {
                change.list(
                    lists.items.find(item => item.id === event.value)
                )
            }}
            value={product.model.list ? convertListToValue(product.model.list) : null}
            className={'change_me-product-list-select'}
        />
        <Select
            options={categoriesForSelect}
            isMulti={true}
            placeholder={'select categories'}
            onChange={(data) => {

                change.categories(
                    data.map((item) => {
                        return categories.items.find(c => c.id === item.value)
                    })
                )
            }}
            value={categoriesSelected}
            className={'change_me-product-categories-select'}
        />

    </section>
}

const mapStateToProps = state => {
    const product = getProduct(state);
    const lists = getLists(state);
    const categories = getCategories(state);
    return {product, lists, categories};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (id) => dispatch(fetchProduct(id)),
        updateProduct: (model) => dispatch(updateProduct(model)),
        createProduct: (model) => dispatch(createProduct(model)),
        resetProduct: (model) => dispatch(resetProduct(model)),
        change: {
            title: (value) => dispatch(changeProductField(PRODUCT_FIELD_TITLE, value)),
            description: (value) => dispatch(changeProductField(PRODUCT_FIELD_DESCRIPTION, value)),
            barcode: (value) => dispatch(changeProductField(PRODUCT_FIELD_BARCODE, value)),
            link: (value) => dispatch(changeProductField(PRODUCT_FIELD_LINK, value)),
            image: (value) => dispatch(changeProductField(PRODUCT_FIELD_IMAGE, value)),
            list: (value) => dispatch(changeProductField(PRODUCT_FIELD_LIST, value)),
            categories: (value) => dispatch(changeProductField(PRODUCT_FIELD_CATEGORIES, value)),
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);