import React from "react";
import { connect } from 'react-redux'

import Source from './Source'

class SourcesFilter extends React.Component
{

  toggle( name )
  {
    const enabled = this.props.sources.filter( source => source.enabled )

    // do no let to disable everything
    if( enabled.length == 1 && enabled[0].name == name )
      return;

    this.props.dispatch({
      type: 'entries.filter.source.toggle',
      source: name
    })
  }

  render()
  {
    return (
      <div role="group" className="btn-group btn-group-vertical d-flex">
        {
          this.props.sources.map( source => (
            <Source key={ source.name }
              value={ source }
              onClick={ () => this.toggle( source.name ) }
            />
          ))
        }
      </div>
    );
  }
}

export default connect( state =>
  ({
    sources: state.entries.filter.sources
  })
)( SourcesFilter )
