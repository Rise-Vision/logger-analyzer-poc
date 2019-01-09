import React from "react";
import { connect } from 'react-redux'

class IconToolbar extends React.Component
{

  selectViewMode( mode )
  {
    this.props.dispatch({ type: 'entries.view.change', mode })
  }

  setFiltersVisibility( visible )
  {
    this.props.dispatch(
    {
      type: 'entries.filter',
      filter: { visible }
    })
  }

  render()
  {
    const { viewMode, visible } = this.props

    return (
      <div className="iconToolbar">
        <i className={
            `m-2 fa fa-table ${ viewMode == 'table' ? 'text-primary' : '' }`
          }
          onClick={ () => this.selectViewMode( 'table' ) }
        />
        <i className={
            `m-2 fa fa-list  ${ viewMode == 'list'  ? 'text-primary' : '' }`
          }
          onClick={ () => this.selectViewMode( 'list'  ) }
        />
        <i className={
            `m-2 fa fa-arrow-${ visible ? 'left' : 'right' }`
          }
          onClick={ () => this.setFiltersVisibility( !visible ) }
        />
      </div>
    );
  }

}

export default connect( state =>
  ({
    viewMode: state.entries.view,
    visible: state.entries.filter.visible
  })
)( IconToolbar )
