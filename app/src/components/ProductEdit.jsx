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
    Intent, MenuItem,
    NonIdealState,
    Spinner, Tag, TagInput
} from "@blueprintjs/core";
import {useHistory, useParams} from "react-router-dom";
import {fetchProduct} from "../redux/actions/product";
import {STATUS_ERROR, STATUS_LOADING} from "../redux/reducers/lists";
import {STATUS_NOT_FOUND} from "../redux/reducers/product";
import {MultiSelect, Suggest} from "@blueprintjs/select";


const ProductEdit = ({product, lists, categories, fetchProduct}) => {
    const history = useHistory();
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

    let onCancelHandler = () => {
        history.push("/product/" + product.model.id);
    }

    const textLinkToShop = <Tag minimal={true}> Link to shop</Tag>;
    const textLinkToPicture = <Tag minimal={true}> Link to picture</Tag>;

    const listItemRenderer = (item) => {
        return <MenuItem
            text={item.title}
        />
    }

    const listInputValueRenderer = (item) => {
        return item.title
    }

    return <section className="content">
        <ButtonGroup>
            <Button icon={'tick'} minimal={true} intent={Intent.SUCCESS}>Save</Button>
            <Button icon={'undo'} minimal={true} onClick={onCancelHandler}>Cancel</Button>
            {/*<Button  icon={'delete'} minimal={true} intent={Intent.DANGER}>Delete</Button>*/}
        </ButtonGroup>
        <img src={product.model.image} alt={product.model.title} width={100} height={100}/>
        <h1><EditableText multiline={false} minLines={1} maxLines={1} defaultValue={product.model.title}/></h1>
        <EditableText multiline={true} minLines={3} maxLines={100} defaultValue={product.model.description}/>
        <InputGroup
            fill={true}
            leftElement={textLinkToShop}
            defaultValue={product.model.link}
        />
        <InputGroup
            fill={true}
            leftElement={textLinkToPicture}
            defaultValue={product.model.image}
        />
        <Suggest
            fill={true}
            items={lists.items}
            noResults={<MenuItem disabled={true} text="No results." />}
            inputValueRenderer={listInputValueRenderer}
            itemRenderer={listItemRenderer}
            itemsEqual={(a, b) => {
                return a.id === b.id
            }}
            onItemSelect={(item, event) => {
                console.log(item, event)
            }}
            selectedItem={product.model.list}
        />
        <MultiSelect
            fill={true}
            tagRenderer={item => item.title}
            items={categories.items}
            onItemSelect={(item, event) => {
                console.log(item, event)
            }}
            itemsEqual={(a, b) => {
                return a.id === b.id
            }}
            selectedItems={product.model.categories}
            itemRenderer={listItemRenderer}/>
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
        fetchProduct: (id) => dispatch(fetchProduct(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);