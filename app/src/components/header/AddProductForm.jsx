import * as React from 'react'

const AddProductForm = () => {
    return (
        <div className={'page-header__product-addition product-addition'}>
            <input className={'product-addition__input product-addition__input--hidden'}
                   placeholder="Название нового продукта"/>
            <button className={'product-addition__button'}>
                <svg className={'product-addition__button-svg'} data-icon="plus" width="16" height="16"
                     viewBox="0 0 16 16">
                    <path className={'product-addition__button-path'}
                          d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
                          fillRule="evenodd"></path>
                </svg>
                <span className={'product-addition__button-text'}>Добавить продукт</span>
            </button>
        </div>
    )
}


export default AddProductForm