import React from "react";
import { connect } from 'react-redux'

import EntryRow from './EntryRow'

class EntryTable extends React.Component
{

  render()
  {
    const { list } = this.props

    return (
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Event</th>
              <th scope="col">Display id</th>
              <th scope="col">Company id</th>
              <th scope="col">Source</th>
              <th scope="col">Component id</th>
              <th scope="col">Version</th>
              <th scope="col">Player</th>
              <th scope="col">Operating system</th>
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

export default connect()( EntryTable )
