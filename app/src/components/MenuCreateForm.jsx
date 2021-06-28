import {Button, Callout, InputGroup, Intent} from "@blueprintjs/core";
import * as React from "react";
import {STATUS_ERROR} from "../redux/reducers/lists";

export const MenuCreateForm = (props) => {

    const addButton = (
        <Button
            minimal={true}
            icon="plus"
            onClick={props.onSubmit}
        />
    )

    let intent = Intent.NONE
    let errorCallout

    if (props.status === STATUS_ERROR){
        intent = Intent.DANGER
        errorCallout = <Callout intent={Intent.DANGER} icon={null}>{props.error}</Callout>
    }

    return <div>
        <InputGroup
            placeholder={props.placeholder}
            rightElement={addButton}
            leftIcon={props.icon}
            value={props.value}
            intent={intent}
            onChange={(e) => {
                props.onChange(e.target.value)
            }}
        />
        {errorCallout}
    </div>
}