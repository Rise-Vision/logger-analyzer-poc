import React from "react";
import { connect } from 'react-redux'

class SingleData extends React.Component
{

  render()
  {
    const { data, filter, single } = this.props

    const isSingleData =
      single.displayId || single.companyId || single.player || single.os

    return (
      <div>
        { filter.visible && isSingleData ?
          (
            <div className="row">
              { single.displayId ?
                (
                  <label className="col-sm-4 col-form-label"
                  ><b>Display id</b></label>
                ) : null
              }
              { single.displayId ?
                (
                  <div className="col-sm-8 mt-2">
                    { data[0].display_id }
                  </div>
                ) : null
              }
              { single.companyId ?
                (
                  <label className="col-sm-4 col-form-label"
                  ><b>Company id</b></label>
                ) : null
              }
              { single.companyId ?
                (
                  <div className="col-sm-8 mt-2">
                    { data[0].company_id }
                  </div>
                ) : null
              }
              { single.player ?
                (
                  <label className="col-sm-4 col-form-label"
                  ><b>Player</b></label>
                ) : null
              }
              { single.player ?
                (
                  <div className="col-sm-8 mt-2">
                    { data[0].player.type } { data[0].player.version }
                  </div>
                ) : null
              }
              { single.os ?
                (
                  <label className="col-sm-4 col-form-label"
                  ><b>Operating system</b></label>
                ) : null
              }
              { single.os ?
                (
                  <div className="col-sm-8 mt-2">
                    { data[0].player.os }
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default connect( state =>
  ({
    data  : state.entries.data  ,
    filter: state.entries.filter,
    single: state.entries.single
  })
)( SingleData )
