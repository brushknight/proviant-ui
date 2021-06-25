import './style/main.less';
import MenuLists from "./components/MenuLists";
import MenuCategories from "./components/MenuCategories";
import * as React from "react";
import MenuSettings from "./components/MenuSettings";
import BreadCrumbs from "./components/BreadCrumbs";

function App() {
  return (
    <div className="page-body">
        <header className="page-header">
            <nav className="page-header__navigation">
                <MenuLists/>
                <MenuCategories/>
                <MenuSettings/>
            </nav>
        </header>

        <main className="page-main">
            <BreadCrumbs/>
            <section className="content">
                <div className="content__product-details">
                    <div className="content__product-designation">
                        <span className="content__product-status"></span>
                        <span className="content__product-title">Name of product</span>
                        <span className="content__product-stock">stock: 5 x 1 KG (5kg total)</span>
                    </div>
                    <div className="content__product-sorting">
                        <span className="content__product-list">Pantry</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                    </div>
                </div>
                <div className="content__product-details">
                    <div className="content__product-designation">
                        <span className="content__product-status"></span>
                        <span className="content__product-title">Name of product</span>
                        <span className="content__product-stock">stock: 5 x 1 KG (5kg total)</span>
                    </div>
                    <div className="content__product-sorting">
                        <span className="content__product-list">Pantry</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                        <span className="content__product-category">Category</span>
                    </div>
                </div>
            </section>
        </main>

    </div>
  );
}

export default App;
