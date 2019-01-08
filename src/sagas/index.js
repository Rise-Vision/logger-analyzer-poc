import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import { entriesLoad } from './entries'

export function* sagas()
{
  yield [
    fork( takeLatest, 'entriesLoad', entriesLoad )
  ]
}
