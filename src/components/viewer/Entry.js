import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

import EntryDetails from './EntryDetails'

import { timestampOf } from '../../common'

const marginUnit = 20

class Entry extends React.Component
{

  toggleExpansion()
  {
    this.props.dispatch({
      type: 'entries.expansion.toggle',
      index: this.props.index
    })
  }

  render()
  {
    const { data, sources } = this.props
    const { event, level, platform, source } = data

    const { left, right } = sources[platform]
    . find( current => current.name == source ) ||
        { left: 0, right: 0 }

    const formattedDate = new Date( timestampOf( data ) )
    . toISOString()
    . replace(/[TZ]/g, ' ')

    return (
      <div
        className={
          `alert alert-${
            level    == 'severe' || level == 'error' ? 'danger'  :
            level    == 'warning'                    ? 'warning' :
            platform == 'player'                     ? 'success' : 'info'
          } mb-2`
        }
        style={{
          marginLeft: left * marginUnit,
          marginRight: right * marginUnit
        }}
      >
        <div onClick={ () => this.toggleExpansion() }>
          { formattedDate }: { event }
          { data.expanded ? <EntryDetails data={ data }/> : null }
        </div>
      </div>
    );
  }
}

Entry.propTypes =
{
  data : PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default connect( state =>
  ({
    sources: state.entries.filter.sources
  })
)( Entry )
