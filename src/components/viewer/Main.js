import React from "react";
import { connect } from 'react-redux'

import Entries from './Entries'
import Filters from './Filters'
import Histogram from './Histogram'

class Main extends React.Component
{
  constructor( props )
  {
    super( props )

    if( ! this.props.loaded )
    {
      this.props.dispatch({ type: 'entriesLoad' })
    }
  }

  render()
  {
    return (
      <div className="page-home">
        <div className="row">
          <div className="col-lg-12 mb-2">
            <Histogram/>
          </div>
          <div className="col-sm-12 col-lg-4">
            <Filters/>
          </div>
          <div className="col-sm-12 col-lg-8">
            <div className="iconToolbar">
              <i className="fa fa-list  m-2 text-primary" ></i>
              <i className="fa fa-table m-2"></i>
            </div>
            <Entries/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect( state =>
  ({
    loaded: state.entries.loaded
  })
)( Main )
