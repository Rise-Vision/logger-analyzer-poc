import React from "react";
import { connect } from 'react-redux'

class TextFilter extends React.Component
{

  constructor( props )
  {
    super( props )

    this.changeTerms = this.changeTerms.bind( this )
    this.changeTermsBuffer = this.changeTermsBuffer.bind( this )
    this.search = this.search.bind( this )
  }

  changeTermsBuffer(e)
  {
    this.props.dispatch({
      type: 'entries.filter',
      filter: { termsBuffer: e.target.value }
    })
  }

  changeTerms(e)
  {
    if( e.keyCode != 13 )
      return;

    this.search()
  }

  search()
  {
    console.log('aaa')
    const { termsBuffer } = this.props.filter

    this.props.dispatch({
      type: 'entries.filter',
      filter: { terms: termsBuffer }
    })
  }

  render()
  {
    const { termsBuffer } = this.props.filter

    return (
      <div className="input-group mb-2">
        <input type="text" className="form-control"
          placeholder="search terms"
          value={ termsBuffer }
          onChange={ this.changeTermsBuffer }
          onKeyDown={ this.changeTerms }
        />
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button"
            onClick={ this.search }
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default connect( state =>
  ({
    filter: state.entries.filter
  })
)( TextFilter )
