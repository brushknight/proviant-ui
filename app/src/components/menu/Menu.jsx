import * as React from "react";

const Menu = ({isOpen}) => {

    let toggleStyle = 'list-navigation__wrapper-for-list--hidden'
    if (isOpen) {
        toggleStyle = ''
    }

    return (
        <div className={'list-navigation__wrapper-for-list ' + toggleStyle}>
            <div className={'list-navigation__wrapper-for-title'}>
                <h2 className={'list-navigation__title-list'}>Списки</h2>
                <button className={'list-navigation__title-button'}>
                    <svg className={'list-navigation__title-button-svg'} data-icon="plus" width="16" height="16"
                         viewBox="0 0 16 16">
                        <path className={'list-navigation__title-button-path'}
                              d="M13 7H9V3c0-.55-.45-1-1-1s-1 .45-1 1v4H3c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V9h4c.55 0 1-.45 1-1s-.45-1-1-1z"
                              fillRule="evenodd"></path>
                    </svg>
                    <span className={'list-navigation__title-button-text'}>Добавить</span>
                </button>
            </div>
            <ul className={'list-navigation__list'}>
                <li className={'list-navigation__item'}>
                    <h3 className={'list-navigation__item-title'}>Список 1</h3>
                    <button className={'list-navigation__item-button'}>
                        <div>
                            <svg className={'list-navigation__item-button-svg'} data-icon="edit" width="16" height="16"
                                 viewBox="0 0 16 16">
                                <path className={'list-navigation__item-button-path'}
                                      d="M3.25 10.26l2.47 2.47 6.69-6.69-2.46-2.48-6.7 6.7zM.99 14.99l3.86-1.39-2.46-2.44-1.4 3.83zm12.25-14c-.48 0-.92.2-1.24.51l-1.44 1.44 2.47 2.47 1.44-1.44c.32-.32.51-.75.51-1.24.01-.95-.77-1.74-1.74-1.74z"
                                      fillRule="evenodd"></path>
                            </svg>
                        </div>
                    </button>
                </li>
                <li className={'list-navigation__item'}>
                    <h3 className={'list-navigation__item-title'}>Список 2</h3>
                    <button className={'list-navigation__item-button'}>
                        <div>
                            <svg className={'list-navigation__item-button-svg'} data-icon="edit" width="16" height="16"
                                 viewBox="0 0 16 16">
                                <path className={'list-navigation__item-button-path'}
                                      d="M3.25 10.26l2.47 2.47 6.69-6.69-2.46-2.48-6.7 6.7zM.99 14.99l3.86-1.39-2.46-2.44-1.4 3.83zm12.25-14c-.48 0-.92.2-1.24.51l-1.44 1.44 2.47 2.47 1.44-1.44c.32-.32.51-.75.51-1.24.01-.95-.77-1.74-1.74-1.74z"
                                      fillRule="evenodd"></path>
                            </svg>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Menu