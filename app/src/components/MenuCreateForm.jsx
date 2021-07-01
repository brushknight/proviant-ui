import { Button, Callout, InputGroup, Intent, Spinner, SpinnerSize } from '@blueprintjs/core'
import * as React from 'react'
import { STATUS_ERROR, STATUS_LOADING } from '../redux/reducers/consts'

export const MenuCreateForm = (props) => {
  let button = (
        <Button
            minimal={true}
            icon="plus"
            onClick={props.onSubmit}
        />
  )

  let intent = Intent.NONE
  let errorCallout

  if (props.status === STATUS_ERROR) {
    intent = Intent.DANGER
    errorCallout = <Callout intent={Intent.DANGER} icon={null}>{props.error}</Callout>
  }

  if (props.status === STATUS_LOADING) {
    button = <Spinner size={SpinnerSize.SMALL}/>
  }

  return <div>
        <InputGroup
            placeholder={props.placeholder}
            rightElement={button}
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
