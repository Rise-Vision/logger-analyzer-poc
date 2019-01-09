import React from "react";
import { connect } from 'react-redux'

import LevelFilter from './LevelFilter'
import PlatformFilter from './PlatformFilter'
import SourcesFilter from './SourcesFilter'
import StageFilter from './StageFilter'
import TextFilter from './TextFilter'

class Filters extends React.Component
{

  render()
  {
    const { showContent, showPlayer } = this.props.filter

    return (
      <div>
        <LevelFilter/>
        <PlatformFilter/>
        <TextFilter/>
        { showPlayer  ?
            <SourcesFilter theme="success" platform="player" /> : null
        }
        { showContent ?
            <SourcesFilter theme="primary" platform="content"/> : null
        }
      </div>
    );
  }
}

export default connect( state =>
  ({
    filter: state.entries.filter
  })
)( Filters )
