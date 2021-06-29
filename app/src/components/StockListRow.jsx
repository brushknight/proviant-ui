import * as React from "react";
import {Button, Intent} from "@blueprintjs/core";

const StockListRow = () => {

    return (
        <div>
            Quantity: 5 Expires: 2021-07-07
            <Button icon={"delete"} minimal={true} intent={Intent.DANGER} text={"Delete entry"}/>
        </div>
    );
}

export default StockListRow