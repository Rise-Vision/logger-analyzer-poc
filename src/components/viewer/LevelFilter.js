import React from "react";
import { connect } from 'react-redux'

class LevelFilter extends React.Component
{

  selectLevel( level )
  {
    this.props.dispatch({
      type: 'entries.filter',
      filter: { level }
    })
  }

  render()
  {
    const { level } = this.props

    return (
      <div role="group" className="btn-group d-flex mb-2">
        <button type="button" className={
            `btn w-100 btn-${
              level == 'error'   ? 'danger' :
              level == 'warning' ? 'warning' : 'primary'
            }`
          }
          onClick={ () => this.selectLevel( 'error' ) }
        >
          Error
        </button>
        <button type="button" className={
            `btn w-100 btn-${
              level == 'error'   ? 'secondary' :
              level == 'warning' ? 'warning'   : 'primary'
            }`
          }
          onClick={ () => this.selectLevel( 'warning' ) }
        >
          Warning
        </button>
        <button type="button" className={
            `btn w-100 btn-${
              ( level == 'error' || level == 'warning' ) ?
                 'secondary' : 'primary'
            }`
          }
          onClick={ () => this.selectLevel( 'info' ) }
        >
          Info
        </button>
        <button type="button" className={
            `btn w-100 btn-${
              ( level == 'error' || level == 'warning' || level == 'info' ) ?
                 'secondary' : 'primary'
            }`
          }
          onClick={ () => this.selectLevel( 'debug' ) }
        >
          Debug
        </button>
      </div>
    );
  }
}

export default connect( state =>
  ({
    level: state.entries.filter.level
  })
)( LevelFilter )
