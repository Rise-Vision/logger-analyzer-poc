import React from "react";
import { connect } from 'react-redux'

class IconToolbar extends React.Component
{

  selectViewMode( mode )
  {
    this.props.dispatch({ type: 'entries.view.change', mode })
  }

  render()
  {
    const { viewMode } = this.props

    return (
      <div className="iconToolbar">
        <i className={
            `fa fa-list  m-2 ${ viewMode == 'list'  ? 'text-primary' : '' }`
          }
          onClick={ () => this.selectViewMode( 'list'  ) }
        />
        <i className={
            `fa fa-table m-2 ${ viewMode == 'table' ? 'text-primary' : '' }`
          }
          onClick={ () => this.selectViewMode( 'table' ) }
        />
      </div>
    );
  }

}

export default connect( state =>
  ({
    viewMode: state.entries.view
  })
)( IconToolbar )
