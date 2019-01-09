import React from "react";
import { connect } from 'react-redux'

class EntryRow extends React.Component
{

  render()
  {
    const { data } = this.props

    return (
      <tr>
        <th scope="col">{ data.ts }</th>
        <th scope="col">{ data.event }</th>
        <th scope="col">{ data.display_id }</th>
        <th scope="col">{ data.company_id }</th>
        <th scope="col">{ data.source }</th>
        <th scope="col">{ data.component && data.component.id }</th>
        <th scope="col">{ data.version }</th>
        <th scope="col">{ data.player.type } { data.player.version }</th>
        <th scope="col">{ data.player.os }</th>
        <th scope="col">
          { data.event_details && data.event_details.substring( 0, 400 ) }
        </th>
      </tr>
    )
  }
}

export default connect()( EntryRow )
