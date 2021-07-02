import * as React from 'react'
import { Button, Callout, FormGroup, Icon, Intent, NumericInput, Spinner, SpinnerSize, Tag } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS } from '../../redux/reducers/consts'
import { useState } from 'react'
import { unixToDate } from '../../utils/date'
import { DateInput } from '@blueprintjs/datetime'

const AddForm = (props) => {
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState(new Date())

  let formError

  if (props.status === STATUS_ERROR) {
    formError = <Callout icon={null} intent={Intent.DANGER}>{props.error}</Callout>
  }

  let formLoading

  if (props.status === STATUS_LOADING) {
    formLoading = <Spinner size={SpinnerSize.SMALL}/>
  }

  let formSuccess

  if (props.status === STATUS_SUCCESS) {
    formSuccess = <Tag intent={Intent.SUCCESS} large={true} minimal={true}><Icon icon={'tick'}/></Tag>
  }

  const jsDateFormatter = {
    // note that the native implementation of Date functions differs between browsers
    formatDate: date => unixToDate(date),
    placeholder: 'DD/MM/YYYY',
    value: date,
    maxDate: new Date('2100/01/01'),
    onChange: (date) => {
      setDate(date)
    }
  }

  return (
    <div>
      <h3>Add</h3>
      {formError}
      <FormGroup label={'Quantity'} inline={true}>
        <NumericInput
          min={1}
          value={quantity}
          onValueChange={value => setQuantity(value)}
        />
      </FormGroup>
      <FormGroup label={'Expires'} inline={true}>
        <DateInput {...jsDateFormatter} />
      </FormGroup>
      <Button icon={'flame'} onClick={() => {
        props.onSubmit(quantity, date)
      }}>Add Stock <b>{quantity}</b></Button> {formLoading} {formSuccess}
    </div>
  )
}

AddForm.propTypes = {
  status: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func
}

export default AddForm
