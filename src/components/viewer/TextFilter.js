import React from "react";
import { connect } from 'react-redux'

class TextFilter extends React.Component
{

  constructor( props )
  {
    super( props )

    this.changeTerms = this.changeTerms.bind( this )
    this.changeTermsBuffer = this.changeTermsBuffer.bind( this )
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
      <input type="text" className="form-control mb-2"
        placeholder="search terms"
        value={ termsBuffer }
        onChange={ this.changeTermsBuffer }
        onKeyDown={ this.changeTerms }
      />
    );
  }
}

export default connect( state =>
  ({
    filter: state.entries.filter
  })
)( TextFilter )
