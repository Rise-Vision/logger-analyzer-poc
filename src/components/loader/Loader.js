import React from "react";
import { connect } from 'react-redux'

import FormPanel from './FormPanel'
import SqlPanel from './SqlPanel'

class Loader extends React.Component
{

  changeLoaderInput( view )
  {
    this.props.dispatch({ type: 'loader.view', view })
  }

  render()
  {
    const { view } = this.props

    return (
      <div>
        <nav className="nav nav-tabs flex-column flex-sm-row mb-2">
          <div className={
              `flex-sm-fill text-sm-center nav-link ${ view == 'form' ? 'active' : '' }`
            }
            onClick={ () => this.changeLoaderInput( 'form' ) }
          >
            Form
          </div>
          <div className={
              `flex-sm-fill text-sm-center nav-link ${ view == 'sql' ? 'active' : '' }`
            }
            onClick={ () => this.changeLoaderInput( 'sql' ) }
          >
            SQL Input
          </div>
        </nav>
        { view == 'form' ? <FormPanel/> : null }
        { view == 'sql'  ? <SqlPanel /> : null }
      </div>
    );
  }
}

export default connect( state =>
  ({
    view: state.loader.view
  })
)( Loader )
