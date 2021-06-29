import * as React from "react";
import {Button, Intent} from "@blueprintjs/core";
import {unixToDate} from "../utils/date";

const StockListRow = (props) => {

    let expires = unixToDate(new Date(props.item.expire * 1000))

    return (
        <div>
            Quantity: {props.item.quantity} Expires: {expires}
            <Button icon={"delete"} minimal={true} intent={Intent.DANGER} text={"Delete entry"}/>
        </div>
    );
}

export default StockListRow