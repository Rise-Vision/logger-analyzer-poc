import React from "react";
import { connect } from 'react-redux'

class SqlPanel extends React.Component
{

  load()
  {
    window.location.href = '/analyzer'
  }

  render()
  {
    const sql =
`SELECT ts, platform, source, version, display_id, company_id, level, event, event_details, player, component
FROM \`client-side-events.Display_Events.events\`
WHERE ts >= "2019-01-03 00:00:00" AND ts < "2019-01-08 00:00:00"
AND display_id = '6CW4QS6CK7KX'
ORDER BY ts DESC`

    return (
      <div className="form-group row">
        <div className="col-sm-12">
          <textarea className="form-control" cols="80" rows="8"
          >{ sql }</textarea>
        </div>
        <div className="col-sm-12 mt-2">
          <button onClick={ this.load } className="btn btn-primary btn-block">
            Load Data
          </button>
        </div>
      </div>
    );
  }
}

export default connect()( SqlPanel )
