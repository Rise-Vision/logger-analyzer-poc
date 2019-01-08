import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

class Bar extends React.Component
{
  render()
  {
    const height = this.props.size * 10

    return (
      <div style={{ height }}></div>
    );
  }
}

Bar.propTypes =
{
  size: PropTypes.number.isRequired
}

export default connect()( Bar )
