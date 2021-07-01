import * as React from 'react'
import { NonIdealState } from '@blueprintjs/core'

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

export default SectionNotFound
