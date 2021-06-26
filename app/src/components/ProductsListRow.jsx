import * as React from "react";


const ProductsListRow = ({product, categories, lists}) => {

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

    return <div className="content__product-details">
        <div className="content__product-designation">
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