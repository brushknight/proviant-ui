import * as React from "react";
import { useHistory } from "react-router-dom";

const ProductsListRow = ({product, categories, lists}) => {
    const history = useHistory();
    let list = lists.items.find(item => item.id === product.list_id)

    let categoriesFound = []

    product.category_ids.forEach((categoryId) => {
            let category = categories.items.find(item => item.id === categoryId)
            if (category != null) {
                categoriesFound.push(category)
            }
        }
    )

    let productList = ""

    if (list != null){
        productList = <span className="content__product-list">{list.title}</span>
    }

    let onClickHandler = () => {
        history.push("/product/" + product.id);
    }

    return <div className="content__product-details" onClick={onClickHandler}>
        <div className="content__product-designation">
            <img src={product.image} width={30} height={30}/>
            <span className="content__product-status"></span>
            <span className="content__product-title">{product.title}</span>
            <span className="content__product-stock">stock: {product.stock}</span>
        </div>
        <div className="content__product-sorting">
            {productList}
            {categoriesFound.map(category => (
                <span key={category.id} className="content__product-category">{category.title}</span>
            ))}
        </div>
    </div>
}

export default ProductsListRow;