import * as React from "react";
import StockListRow from "./StockListRow";
import {Button, FormGroup, NumericInput} from "@blueprintjs/core";
import {DateInput, IDateFormatProps} from "@blueprintjs/datetime";

const StockList = () => {

    let str = "2021-07-07"

    const jsDateFormatter = {
        // note that the native implementation of Date functions differs between browsers
        formatDate: date => date.toLocaleDateString(),
        parseDate: str => new Date(str),
        placeholder: "M/D/YYYY",
    };

    return (
        <section>
            <div>
                <h3>Consume</h3>
                <FormGroup label={"Quantity"} inline={true}>
                    <NumericInput min={0}/>
                </FormGroup>
                <Button icon={"flame"} text={"Consume"}/>
            </div>
            <div>
                <h3>Add new stock</h3>
                <FormGroup label={"Quantity"} inline={true}>
                    <NumericInput min={0}/>
                </FormGroup>
                <FormGroup label={"Expires"} inline={true}>
                    <DateInput {...jsDateFormatter} />
                </FormGroup>
                <Button icon={"flame"} text={"Add stock"}/>
            </div>

            <h3>In stock</h3>
            <StockListRow/>
            <StockListRow/>
        </section>
    );

}

export default StockList