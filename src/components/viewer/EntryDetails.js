import PropTypes from 'prop-types'
import React from "react";
import { connect } from 'react-redux'

class EntryDetails extends React.Component
{

  render()
  {
    const { data, single } = this.props

    return (
      <div className="row">
        { single.displayId ? null :
          (
            <label className="col-sm-4 col-lg-2 col-form-label"
            >Display id</label>
          )
        }
        { single.displayId ? null :
          (
            <div className="col-sm-8 col-lg-4">
              { data.display_id }
            </div>
          )
        }
        { single.companyId ? null :
          (
            <label className="col-sm-4 col-lg-2 col-form-label"
            >Company id</label>
          )
        }
        { single.displayId ? null :
          (
            <div className="col-sm-8 col-lg-4">
              { data.company_id }
            </div>
          )
        }
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
        { single.player ? null :
          (
            <label className="col-sm-4 col-lg-2 col-form-label"
            >Player</label>
          )
        }
        { single.player ? null :
          (
            <div className="col-sm-8 col-lg-4">
              { data.player.type } { data.player.version }
            </div>
          )
        }
        { single.os ? null :
          (
            <label className="col-sm-4 col-lg-2 col-form-label"
            >Operating system</label>
          )
        }
        { single.os ? null :
          (
            <div className="col-sm-8 col-lg-4">
              { data.player.os }
            </div>
          )
        }
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

export default connect( state =>
  ({
    single: state.entries.single
  })
)( EntryDetails )
