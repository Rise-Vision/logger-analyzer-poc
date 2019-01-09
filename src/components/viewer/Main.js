import React from "react";
import { connect } from 'react-redux'

import { timestampOf } from '../../common'

import Entries from './Entries'
import EntryTable from './EntryTable'
import Filters from './Filters'
import Histogram from './Histogram'
import IconToolbar from './IconToolbar'

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
    const { data, histogram, filter, viewMode } = this.props
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
      <div className="page-home">
        <div className="row">
          <div className="col-lg-12 mb-2">
            <Histogram/>
          </div>
          <div className="col-sm-12 col-lg-4">
            <Filters/>
          </div>
          <div className={
            `col-sm-12 ${ filter.visible ? 'col-lg-8' : '' }`
          }>
            <IconToolbar/>
            { viewMode == 'list' ?
              <Entries list={ selected }/> : <EntryTable list={ selected }/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect( state =>
  ({
    data: state.entries.data,
    filter: state.entries.filter,
    histogram: state.entries.histogram,
    loaded: state.entries.loaded,
    viewMode: state.entries.view
  })
)( Main )
