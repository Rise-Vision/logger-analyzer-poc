import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

import Source from './Source'

class SourcesFilter extends React.Component
{

  toggle( name )
  {
    const { filter, platform } = this.props

    const enabled = filter.sources[ platform ]
    .filter( source => source.enabled )

    // do no let to disable everything
    if( enabled.length == 1 && enabled[0].name == name )
      return;

    this.props.dispatch({
      type: 'entries.filter.source.toggle',
      platform,
      source: name
    })
  }

  render()
  {
    const { filter, platform, theme } = this.props

    return (
      <div role="group" className="btn-group btn-group-vertical d-flex mb-2">
        {
          filter.sources[ platform ].map( source => (
            <Source key={ source.name }
              theme={ theme }
              value={ source }
              onClick={ () => this.toggle( source.name ) }
            />
          ))
        }
      </div>
    );
  }
}

SourcesFilter.propTypes =
{
  platform: PropTypes.string.isRequired,
  theme   : PropTypes.string.isRequired
}

export default connect( state =>
  ({
    filter: state.entries.filter
  })
)( SourcesFilter )
