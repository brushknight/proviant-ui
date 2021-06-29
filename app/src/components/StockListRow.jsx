import * as React from "react";
import {Button, Intent} from "@blueprintjs/core";

const StockListRow = (props) => {

    let expires = unixToDate(new Date(props.item.expire * 1000))

    return (
        <div>
            Quantity: {props.item.quantity} Expires: {expires}
            <Button icon={"delete"} minimal={true} intent={Intent.DANGER} text={"Delete entry"}/>
        </div>
    );
}

const unixToDate = (date) => {

    console.log(date)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

export default StockListRow