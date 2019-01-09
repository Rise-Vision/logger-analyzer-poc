import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

class Bar extends React.Component
{

  toggleSelect()
  {
    const { entry, index } = this.props
    const { selected } = entry

    this.props.dispatch({
      type: `entries.histogram.${ selected ? 'clear' : 'select' }`,
      index
    })
  }

  render()
  {
    const { count, level, selected } = this.props.entry
    const height = count * 10

    const backgroundColor =
      ( selected ) ?
      (
        level == 'error'   ? 'rgb(220,  53,  69)' :
        level == 'warning' ? 'rgb(255, 193,   7)' : 'rgb(0  , 123, 255)'
      ) : (
        level == 'error'   ? 'rgb(245, 198, 203)' :
        level == 'warning' ? 'rgb(255, 243, 205)' : 'rgb(209, 236, 241)'
      )

    return (
      <div
        style={{ height, backgroundColor }}
        onClick={ () => this.toggleSelect() }
      />
    );
  }
}

Bar.propTypes =
{
  entry: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default connect()( Bar )
