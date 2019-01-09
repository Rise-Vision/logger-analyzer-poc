import { timestampOf } from '../common'

function getDistribution( data, minTimestamp, interval )
{
  const counts = new Array( 100 ).fill( 0 )

  data.forEach( entry => {
    const timestamp = timestampOf( entry )
    const index =
      Math.min( Math.floor( ( timestamp - minTimestamp ) / interval ), 99 )

    counts[index] += 1
  })

  const maxCount = Math.max( ...counts )

  return counts.map( count =>
  {
    const size = Math.floor( count * 10 / maxCount )

    return size == 0 && count > 0 ? 1 : size
  })
}

function getSources( data )
{
  const sources = data.reduce( ( list, entry ) =>
    {
      return list.includes( entry.source ) ? list : [ ...list, entry.source ]
    }, []
  )
  .sort()

  return sources.map( ( source, index ) =>
    ({
      name: source,
      enabled: true,
      left: index,
      right: sources.length > 1 ? ( sources.length - index - 1 ) : 0
    })
  )
}

function loadEntries( state, entries )
{
  // TODO: validate there is data
  const minTimestamp = timestampOf( entries[0] )
  const maxTimestamp = timestampOf( entries[entries.length - 1] )

  const interval = ( maxTimestamp - minTimestamp ) / 100
  const distribution = getDistribution( entries, minTimestamp, interval )
  const sources = getSources( entries )

  const data = entries.map( entry => ({ ...entry, expanded: false }) )

  return {
    ...state,
    loaded: true,
    data,
    filter:
    {
      level: 'info',
      showPlayer: false,
      showContent: true,
      terms: '',
      termsBuffer: '',
      sources
    },
    histogram:
    {
      minTimestamp,
      interval,
      distribution
    }
  }
}

function toggleExpansion( state, index )
{
  return {
    ...state,
    data: state.data.map( ( entry, currentIndex ) =>
      index == currentIndex ? { ...entry, expanded: !entry.expanded } : entry
    )
  }
}

function changeFilter( state, filter )
{
  return {
    ...state,
    filter:
    {
      ...state.filter,
      ...filter
    }
  }
}

function toggleFilterSource( state, name )
{
  return changeFilter( state, {
    sources: state.filter.sources.map( source =>
      source.name == name ? { ...source, enabled: ! source.enabled } : source
    )
  })
}

export default function reducers
(
  state =
  {
    loaded: false,
    data: [],
    filter:
    {
      level: 'info',
      showPlayer: false,
      showContent: true,
      terms: '',
      termsBuffer: '',
      sources: []
    },
    histogram:
    {
      minTimestamp: 0,
      interval: 1,
      distribution: []
    }
  },
  action
)
{
  switch( action.type )
  {
    case 'entries.expansion.toggle':
      return toggleExpansion( state, action.index )
    case 'entries.filter':
      return changeFilter( state, action.filter )
    case 'entries.filter.source.toggle':
      return toggleFilterSource( state, action.source )
    case 'entries.load':
      return loadEntries( state, action.data )
  }

  return state
}
