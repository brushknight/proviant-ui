import * as React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

class BreadCrumbs extends React.Component {
	render () {
		return (
			<section className="breadcrumbs">
				<ul className="breadcrumbs__list bp3-breadcrumbs">
					{/* <li><a className="bp3-breadcrumbs-collapsed" href="#"></a></li> */}
					{/* <li><a className="bp3-breadcrumb bp3-disabled">Folder one</a></li> */}
					{/* <li><a className="bp3-breadcrumb" href="#">Folder two</a></li> */}
					{/* <li><a className="bp3-breadcrumb" href="#">Folder three</a></li> */}
					<li><span className="bp3-breadcrumb bp3-breadcrumb-current">Proviant</span></li>
				</ul>
				<div></div>
			</section>
		)
	}
}

BreadCrumbs.propTypes = {
	i18n: PropTypes.object
}

export default withTranslation('translations')(BreadCrumbs)
