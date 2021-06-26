import {Button, InputGroup} from "@blueprintjs/core";
import * as React from "react";

export const MenuCreateForm = (props) => {

    const addButton = (
        <Button
            minimal={true}
            icon="plus"
            onClick={props.onSubmit}
        />
    )

    return <div>
        <InputGroup
            placeholder={props.placeholder}
            rightElement={addButton}
            leftIcon={props.icon}
            value={props.value}
            onChange={(e) => {
                props.onChange(e.target.value)
            }}
        />
    </div>
}