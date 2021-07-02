import * as React from 'react'
import { Callout, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const SectionError = (props) => {
  return (
        <section className="content">
            <Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
                {props.error}
            </Callout>
        </section>
  )
}

SectionError.propTypes = {
  error: PropTypes.string
}

export default SectionError
