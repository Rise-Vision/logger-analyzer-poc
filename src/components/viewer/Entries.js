import React from "react";
import { connect } from 'react-redux'

import Entry from './Entry'

import { timestampOf } from '../../common'

class Entries extends React.Component
{

  inSelectedRange( entry, histogramSelectedIndex )
  {
    if( histogramSelectedIndex < 0 )
      return true

    const { minTimestamp, interval } = this.props.histogram

    const timestampStart = minTimestamp + histogramSelectedIndex * interval
    const timestampEnd   = timestampStart + interval

    const timestamp = timestampOf( entry )

    return timestamp >= timestampStart && timestamp <= timestampEnd
  }

  enabledSourcesFor( platform )
  {
    return this.props.filter.sources[ platform ]
    . filter( source => source.enabled )
    . map( source => source.name )
  }

  render()
  {
    const { data, histogram, filter } = this.props
    const contentSources = this.enabledSourcesFor( 'content' )
    const  playerSources = this.enabledSourcesFor( 'player'  )
    const sources = [ ...contentSources, ...playerSources ]

    const histogramSelectedIndex = histogram.distribution.findIndex( entry =>
      entry.selected
    )

    const selected = data.filter( entry => {
      if( ! this.inSelectedRange( entry, histogramSelectedIndex ) )
        return false
      if( ! sources.includes( entry.source ) )
        return false
      if( ! filter.showPlayer && entry.platform == 'player' )
        return false
      if( ! filter.showContent && entry.platform == 'content' )
        return false
      if( filter.level == 'error' && entry.level != 'severe' && entry.level != 'error' )
        return false
      if( filter.level == 'warning' && ( entry.level == 'info' || entry.level == 'debug' ) )
        return false
      if( filter.level == 'info' && entry.level == 'debug' )
        return false
      if( filter.terms && ! filter.terms.split(/\s+/).find( term =>
        entry.event.indexOf( term ) >= 0
      ) )
        return false

      return true
    })

    return (
      <div>
        {
          selected.map( ( entry, index ) =>
            <Entry key={ index } index={ index } data={ entry }/>
          )
        }
      </div>
    );
  }
}

export default connect( state =>
  ({
    data: state.entries.data,
    filter: state.entries.filter,
    histogram: state.entries.histogram
  })
)( Entries )
