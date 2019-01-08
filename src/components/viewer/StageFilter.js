import React from "react";
import { connect } from 'react-redux'

class StageFilter extends React.Component
{

  render()
  {
    const stage = 'beta'

    return (
      <div role="group" className="btn-group d-flex mb-2">
        <button type="button" className={
            `btn w-100 btn-${
              stage == 'beta' ? 'primary' : 'secondary'
            }`
          }
        >
          Beta
        </button>
        <button type="button" className={
            `btn w-100 btn-${
              stage == 'stable' ? 'primary' : 'secondary'
            }`
          }
        >
          Stable
        </button>
      </div>
    );
  }
}

export default connect()( StageFilter )
