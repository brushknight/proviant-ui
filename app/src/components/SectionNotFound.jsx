import * as React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import PropTypes from 'prop-types'

const SectionNotFound = (props) => {
  return (
        <section className="content">
            <NonIdealState
                title={props.title}
                icon={'search'}
                description={props.error}
            />
        </section>
  )
}

SectionNotFound.propTypes = {
  error: PropTypes.string,
  title: PropTypes.string
}

export default SectionNotFound
