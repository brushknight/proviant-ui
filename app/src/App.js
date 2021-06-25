import './App.css';
import MenuLists from "./components/MenuLists";
import MenuCategories from "./components/MenuCategories";
import * as React from "react";
import MenuSettings from "./components/MenuSettings";
import BreadCrumbs from "./components/BreadCrumbs";

function App() {
  return (
    <div className="App">
        <header className="page-header">
            <nav className="page-header__navigation">
                <MenuLists/>
                <MenuCategories/>
                <MenuSettings/>
            </nav>
        </header>

      <main className="page-main">
        <BreadCrumbs/>
        <div className="page-main__content" />
      </main>

    </div>
  );
}

export default App;
