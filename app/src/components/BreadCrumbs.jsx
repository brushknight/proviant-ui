import * as React from "react";

class BreadCrumbs extends React.Component {
    render() {
        return (
            <div className="page-main__breadcrumbs">
                <ul className="bp3-breadcrumbs">
                    <li>
                        <a className="bp3-breadcrumb bp3-disabled">All products</a>
                    </li>
                    <li>
                        <span className="bp3-breadcrumb bp3-breadcrumb-current">
                            Product 1
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default BreadCrumbs