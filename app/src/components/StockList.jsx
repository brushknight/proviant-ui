import * as React from "react";
import StockListRow from "./StockListRow";
import {Button, Callout, FormGroup, Intent, NonIdealState, NumericInput, Spinner} from "@blueprintjs/core";
import {DateInput} from "@blueprintjs/datetime";
import {fetchStock} from "../redux/actions/stock";
import {getStock} from "../redux/selectors";
import {connect} from "react-redux";
import {useEffect} from "react";
import {STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND} from "../redux/reducers/consts";

const StockList = ({productId, stock, fetchStock}) => {

    useEffect(() => {
        fetchStock(productId)
    }, [productId])

    let str = "2021-07-07"

    const jsDateFormatter = {
        // note that the native implementation of Date functions differs between browsers
        formatDate: date => date.toLocaleDateString(),
        parseDate: str => new Date(str),
        placeholder: "M/D/YYYY",
    };

    if (stock.status === STATUS_LOADING){
        return (
            <section>
                <Spinner/>
            </section>
        )
    }

    if (stock.status === STATUS_ERROR){
        return (
            <section>
                <Callout intent={Intent.DANGER} title={"Something went wrong with stock fetching"}>{stock.error}</Callout>
            </section>
        )
    }

    if (stock.status === STATUS_NOT_FOUND) {
        return <section></section>
    }

    let stockList

    if (stock.items.length === 0) {
        stockList = <Callout title={"No stock found for this product"}/>
    }else{
        stockList = stock.items.map(item => <StockListRow item={item}/>)
    }

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
            {stockList}
        </section>
    );

}

const mapStateToProps = (state, ownProps) => {

    const stock = getStock(state)
    const productId = ownProps.productId

    return {productId, stock}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStock: (productId) => dispatch(fetchStock(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList)