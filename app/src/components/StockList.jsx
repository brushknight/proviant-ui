import * as React from "react";
import {useEffect} from "react";
import StockListRow from "./StockListRow";
import {Button, Callout, FormGroup, Icon, Intent, NumericInput, Spinner, SpinnerSize, Tag} from "@blueprintjs/core";
import {DateInput} from "@blueprintjs/datetime";
import {
    addStock,
    consumeStock,
    fetchStock,
    stockAddFormFieldChanged,
    stockConsumeFormFieldChanged
} from "../redux/actions/stock";
import {getStock} from "../redux/selectors";
import {connect} from "react-redux";
import {STATUS_ERROR, STATUS_LOADING, STATUS_NOT_FOUND, STATUS_SUCCESS} from "../redux/reducers/consts";
import {STOCK_ADD_FORM_EXPIRE, STOCK_ADD_FORM_QUANTITY} from "../redux/reducers/stock";
import {unixToDate} from "../utils/date";

const StockList = ({productId, stock, fetchStock, stockAddFormFieldChanged, stockConsumeFormFieldChanged, addStock, consumeStock}) => {

    useEffect(() => {
        fetchStock(productId)
    }, [productId])

    let str = "2021-07-07"

    const jsDateFormatter = {
        // note that the native implementation of Date functions differs between browsers
        formatDate: date => unixToDate(date),
        parseDate: str => new Date(str),
        placeholder: "DD/MM/YYYY",
        value: stock.addForm.expire,
        onChange: (date) => {
            stockAddFormFieldChanged(STOCK_ADD_FORM_EXPIRE, date)
        }
    };

    if (stock.status === STATUS_LOADING) {
        return (
            <section>
                <Spinner/>
            </section>
        )
    }

    if (stock.status === STATUS_ERROR) {
        return (
            <section>
                <Callout intent={Intent.DANGER}
                         title={"Something went wrong with stock fetching"}>{stock.error}</Callout>
            </section>
        )
    }

    if (stock.status === STATUS_NOT_FOUND) {
        return <section></section>
    }

    let stockList

    if (stock.items.length === 0) {
        stockList = <Callout title={"No stock found for this product"}/>
    } else {
        stockList = stock.items.map(item => <StockListRow item={item}/>)
    }

    let addStockFormError

    if (stock.addForm.status === STATUS_ERROR) {
        addStockFormError = <Callout icon={null} intent={Intent.DANGER}>{stock.addForm.error}</Callout>
    }

    let addStockFormLoading

    if (stock.addForm.status === STATUS_LOADING) {
        addStockFormLoading = <Spinner size={SpinnerSize.SMALL}/>
    }

    let addStockFormSuccess

    if (stock.addForm.status === STATUS_SUCCESS) {
        addStockFormSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={"tick"}/></Tag>
    }

    let addStockForm = <div>
        <h3>Add new stock</h3>
        {addStockFormError}
        <FormGroup label={"Quantity"} inline={true}>
            <NumericInput
                min={0}
                value={stock.addForm.quantity}
                onValueChange={value => stockAddFormFieldChanged(STOCK_ADD_FORM_QUANTITY, value)}
            />
        </FormGroup>
        <FormGroup label={"Expires"} inline={true}>
            <DateInput {...jsDateFormatter} />
        </FormGroup>
        <Button icon={"flame"} text={"Add stock"} onClick={() => {
            addStock(productId, stock.addForm)
        }}/> {addStockFormLoading} {addStockFormSuccess}
    </div>

    let consumeStockFormError

    if (stock.consumeForm.status === STATUS_ERROR) {
        consumeStockFormError = <Callout icon={null} intent={Intent.DANGER}>{stock.consumeForm.error}</Callout>
    }

    let consumeStockFormLoading

    if (stock.consumeForm.status === STATUS_LOADING) {
        consumeStockFormLoading = <Spinner size={SpinnerSize.SMALL}/>
    }

    let consumeStockFormSuccess

    if (stock.consumeForm.status === STATUS_SUCCESS) {
        consumeStockFormSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={"tick"}/></Tag>
    }


    let consumeStockForm = <div>
        <h3>Consume</h3>
        {consumeStockFormError}
        <FormGroup label={"Quantity"} inline={true}>
            <NumericInput
                min={0}
                value={stock.consumeForm.quantity}
                onValueChange={value => stockConsumeFormFieldChanged(value)}
            />
        </FormGroup>
        <Button icon={"flame"} onClick={() => {
            consumeStock(productId, stock.consumeForm)
        }}>Consume <b>{stock.consumeForm.quantity}</b></Button> {consumeStockFormLoading} {consumeStockFormSuccess}
    </div>


    return (
        <section>
            {consumeStockForm}
            {addStockForm}
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
        fetchStock: (productId) => dispatch(fetchStock(productId)),
        stockAddFormFieldChanged: (field, value) => dispatch(stockAddFormFieldChanged(field, value)),
        stockConsumeFormFieldChanged: (value) => dispatch(stockConsumeFormFieldChanged(value)),
        addStock: (productId, addStockForm) => dispatch(addStock(productId, addStockForm)),
        consumeStock: (productId, consumeStockForm) => dispatch(consumeStock(productId, consumeStockForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList)