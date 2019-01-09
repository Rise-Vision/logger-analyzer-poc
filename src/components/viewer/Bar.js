import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

class Bar extends React.Component
{
  render()
  {
    const { count, level } = this.props.entry
    const height = count * 10

    return (
      <div style=
        {{
          height,
          backgroundColor:
            level == 'error'   ? 'rgb(245, 198, 203)' : 
            level == 'warning' ? 'rgb(255, 243, 205)' : 'rgb(209, 236, 241)'
        }}
      ></div>
    );
  }
}

Bar.propTypes =
{
  entry: PropTypes.object.isRequired
}

export default connect()( Bar )
