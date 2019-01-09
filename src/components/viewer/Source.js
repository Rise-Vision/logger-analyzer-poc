import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

class Source extends React.Component
{
  render()
  {
    const { name, enabled } = this.props.value
    const theme = this.props.theme

    return (
      <button type="button" className={
        `btn w-100 btn-${ enabled ? theme : 'secondary' }`
        }
        onClick={ () => this.props.onClick() }
      >
        { name }
      </button>
    )
  }
}

Source.propTypes =
{
  theme  : PropTypes.string.isRequired,
  value  : PropTypes.object.isRequired,
  onClick: PropTypes.func  .isRequired
}

export default connect()( Source )
