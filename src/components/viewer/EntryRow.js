import React from "react";
import { connect } from 'react-redux'

class EntryRow extends React.Component
{

  render()
  {
    const { data, single } = this.props
    const { platform, level } = data

    return (
      <tr className=
        {
          `table-${
            level    == 'severe' || level == 'error' ? 'danger'  :
            level    == 'warning'                    ? 'warning' :
            platform == 'player'                     ? 'success' : 'info'
          }`
        }
      >
        <th scope="col">{ data.ts }</th>
        <th scope="col">{ data.event }</th>
        { single.displayId ? null :
          (
            <th scope="col">{ data.display_id }</th>
          )
        }
        { single.companyId ? null :
          (
            <th scope="col">{ data.company_id }</th>
          )
        }
        <th scope="col">{ data.source }</th>
        <th scope="col">{ data.component && data.component.id }</th>
        <th scope="col">{ data.version }</th>
        { single.player ? null :
          (
            <th scope="col">{ data.player.type } { data.player.version }</th>
          )
        }
        { single.os ? null :
          (
            <th scope="col">{ data.player.os }</th>
          )
        }
        <th scope="col">
          { data.event_details && data.event_details.substring( 0, 400 ) }
        </th>
      </tr>
    )
  }
}

export default connect( state =>
  ({
    single: state.entries.single
  })
)( EntryRow )
