import { call, put } from 'redux-saga/effects'

export function getJSON( path )
{
  const options = {
    method: 'get'
  }

  const uri = `/data/${ path }`

  return fetch( uri, options )
  .then( response => response.json() )
}

export function* entriesLoad()
{
  const data = yield call( () => getJSON( 'results.json' ) )

  const event = { type: 'entries.load', data }

  yield put( event )
}
