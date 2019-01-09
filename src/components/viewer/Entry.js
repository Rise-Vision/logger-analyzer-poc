import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

import EntryDetails from './EntryDetails'

import { timestampOf } from '../../common'

const DATE_FORMAT_OPTIONS =
{
  weekday: 'long'   ,
  year   : 'numeric',
  month  : 'long'   ,
  day    : 'numeric'
}
const MARGIN_UNIT = 20

class Entry extends React.Component
{

  toggleExpansion()
  {
    this.props.dispatch({
      type: 'entries.expansion.toggle',
      index: this.props.data.index
    })
  }

  render()
  {
    const { data, previous, sources } = this.props
    const { event, level, platform, source } = data

    const { left, right } = sources[platform]
    . find( current => current.name == source ) ||
        { left: 0, right: 0 }

    const currentTimestamp  = new Date( timestampOf( data ) )
    const previousTimestamp = previous.ts && new Date( timestampOf( previous ) )

    const formattedCurrentTime = currentTimestamp.toISOString().substring(11)
    .replace(/Z/g, '')

    return (
      <div>
        { !previousTimestamp ||
          currentTimestamp.getDay() != previousTimestamp.getDay() ?
          (
            <h3>
              { currentTimestamp.toLocaleDateString( "en-US", DATE_FORMAT_OPTIONS ) }
            </h3>
          ) : null
        }
        <div
          className={
            `alert alert-${
              level    == 'severe' || level == 'error' ? 'danger'  :
              level    == 'warning'                    ? 'warning' :
              platform == 'player'                     ? 'success' : 'info'
            } mb-2`
          }
          style={{
            marginLeft: left * MARGIN_UNIT,
            marginRight: right * MARGIN_UNIT
          }}
        >
          <div onClick={ () => this.toggleExpansion() }>
            { formattedCurrentTime }: { source } - { event }
            { data.expanded ? <EntryDetails data={ data }/> : null }
          </div>
        </div>
      </div>
    );
  }
}

Entry.propTypes =
{
  data    : PropTypes.object.isRequired,
  previous: PropTypes.object.isRequired
}

export default connect( state =>
  ({
    sources: state.entries.filter.sources
  })
)( Entry )
