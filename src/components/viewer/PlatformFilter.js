import React from "react";
import { connect } from 'react-redux'

class PlatformFilter extends React.Component
{

  toggle( platform )
  {
    const { showContent, showPlayer } = this.props.filter

    switch( platform )
    {
      case 'content':
        if( !showContent || showPlayer )
          this.props.dispatch({
            type: 'entries.filter',
            filter: { showContent: !showContent }
          })

        break;

      case 'player':
        if( !showPlayer || showContent )
          this.props.dispatch({
            type: 'entries.filter',
            filter: { showPlayer: !showPlayer }
          })

        break;
    }
  }

  render()
  {
    const { showContent, showPlayer } = this.props.filter

    return (
      <div role="group" className="btn-group d-flex mb-2">
        <button type="button" className={
            `btn w-100 btn-${
              showPlayer ? 'primary' : 'secondary'
            }`
          }
          onClick={ () => this.toggle( 'player' ) }
        >
          Player
        </button>
        <button type="button" className={
            `btn w-100 btn-${
              showContent ? 'primary' : 'secondary'
            }`
          }
          onClick={ () => this.toggle( 'content' ) }
        >
          Content
        </button>
      </div>
    );
  }
}

export default connect( state =>
  ({
    filter: state.entries.filter
  })
)( PlatformFilter )
