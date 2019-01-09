import React from "react";
import { connect } from 'react-redux'

import EntryRow from './EntryRow'

class EntryTable extends React.Component
{

  render()
  {
    const { list, single } = this.props

    return (
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Event</th>
              { single.displayId ? null :
                (
                  <th scope="col">Display id</th>
                )
              }
              { single.companyId ? null :
                (
                  <th scope="col">Company id</th>
                )
              }
              <th scope="col">Source</th>
              <th scope="col">Component id</th>
              <th scope="col">Version</th>
              { single.player ? null :
                (
                  <th scope="col">Player</th>
                )
              }
              { single.os ? null :
                (
                  <th scope="col">Operating system</th>
                )
              }
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map( ( entry, index ) =>
                <EntryRow
                  key      = { index }
                  data     = { entry }
                />
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect( state =>
  ({
    single: state.entries.single
  })
)( EntryTable )
