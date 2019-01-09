import React from "react";
import { connect } from 'react-redux'

import Entry from './Entry'

class Entries extends React.Component
{

  render()
  {
    const { list } = this.props

    return (
      <div>
        {
          list.map( ( entry, index ) =>
            <Entry
              key      = { index }
              data     = { entry }
              previous = { index == 0 ? {} : list[index - 1] }
            />
          )
        }
      </div>
    );
  }
}

export default connect()( Entries )
