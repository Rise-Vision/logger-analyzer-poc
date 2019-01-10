export default function reducers
(
  state =
  {
    view: 'form'
  },
  action
)
{
  switch( action.type )
  {
    case 'loader.view':
      return { view: action.view }
  }

  return state
}
