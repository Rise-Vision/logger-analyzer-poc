import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

class EntryDetails extends React.Component
{

  render()
  {
    const { data } = this.props

    return (
      <div className="row">
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Display id</label>
        <div className="col-sm-8 col-lg-4">
          { data.display_id }
        </div>
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Company id</label>
        <div className="col-sm-8 col-lg-4">
          { data.company_id }
        </div>
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Component</label>
        <div className="col-sm-8 col-lg-4">
          { data.source }
        </div>
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Id</label>
        <div className="col-sm-8 col-lg-4">
          { data.component && data.component.id }
        </div>
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Version</label>
        <div className="col-sm-8 col-lg-4">
          { data.version }
        </div>
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Player</label>
        <div className="col-sm-8 col-lg-4">
          { data.player.type } { data.player.version }
        </div>
        <label className="col-sm-4 col-lg-2 col-form-label"
        >Operating system</label>
        <div className="col-sm-8 col-lg-4">
          { data.player.os }
        </div>
        <label className="col-sm-4 col-form-label"
        >Details</label>
        <div className="col-sm-8">
          { data.event_details }
        </div>
      </div>
    );
  }
}

EntryDetails.propTypes =
{
  data : PropTypes.object.isRequired
}

export default connect()( EntryDetails )
