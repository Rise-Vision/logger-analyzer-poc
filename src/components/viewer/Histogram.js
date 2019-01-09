import React from "react";
import { connect } from 'react-redux'

import Bar from './Bar'

class Histogram extends React.Component
{
  render()
  {
    const distribution = this.props.histogram.distribution || []

    return (
      <div className="histogram">
        {
          distribution.map( ( entry, index ) =>
            <Bar key={ index } index={ index } entry={ entry }/>
          )
        }
      </div>
    );
  }
}

export default connect( state =>
  ({
    histogram: state.entries.histogram
  })
)( Histogram )
