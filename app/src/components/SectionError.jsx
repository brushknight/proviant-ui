import * as React from 'react'
import { Callout, Intent } from '@blueprintjs/core'

const SectionError = (props) => {
  return (
        <section className="content">
            <Callout title={'oops... something went wrong'} intent={Intent.DANGER}>
                {props.error}
            </Callout>
        </section>
  )
}

export default SectionError
