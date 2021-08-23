import * as React from 'react'

const Search = () => {
    return (
        <div className={'page-header__search search'}>
            <button className={'search__button'}>
                <svg className={'search__button-svg'} data-icon="search" width="20" height="20" viewBox="0 0 20 20">
                    <path className={'search__button-path'}
                          d="M19.56 17.44l-4.94-4.94A8.004 8.004 0 0016 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8c1.67 0 3.21-.51 4.5-1.38l4.94 4.94a1.498 1.498 0 102.12-2.12zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                          fillRule="evenodd"></path>
                </svg>
            </button>
            <div className={'search__wrapper search__wrapper--hidden'}>
                <div className={'search__wrapper-search-input'}>
                    <input className={'search__search-input'}/>
                </div>
                <div className={'search__categories'}>Тут будут категории</div>
            </div>
        </div>
    )
}


export default Search