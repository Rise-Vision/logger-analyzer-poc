import React from "react";
import { connect } from 'react-redux'

class FormPanel extends React.Component
{

  load()
  {
    window.location.href = '/analyzer'
  }

  render()
  {
    return (
      <div className="form-group row">
        <label className="col-sm-4 col-lg-2 col-form-label mt-2"
        >Start date</label>
        <div className="col-sm-8 col-lg-4">
          <input type="date" className="form-control"
            value="2019-01-03"
          />
        </div>
          <label className="col-sm-4 col-lg-2 col-form-label mt-2"
          >End date</label>
          <div className="col-sm-8 col-lg-4">
            <input type="date" className="form-control"
              value="2019-01-07"
            />
          </div>
        <label className="col-sm-4 col-lg-2 col-form-label mt-2"
        >Display Id</label>
        <div className="col-sm-8 col-lg-4">
          <input type="text" className="form-control"
            placeholder="6CW4QS6CK7KX"
          />
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

export default connect()( FormPanel )
