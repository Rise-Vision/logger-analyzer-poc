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
    return (
      <div>
        <LevelFilter/>
        <PlatformFilter/>
        <TextFilter/>
        <SourcesFilter/>
      </div>
    );
  }
}

export default connect()( Filters )
