import React from "react";
import { connect } from 'react-redux'

import Entry from './Entry'

class Entries extends React.Component
{
  render()
  {
    const { data, filter } = this.props
    const sources = filter.sources
    .filter( source => source.enabled )
    .map( source => source.name )

    const selected = data.filter( entry => {
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
    filter: state.entries.filter
  })
)( Entries )
