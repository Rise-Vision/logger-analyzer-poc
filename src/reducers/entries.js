import { timestampOf } from '../common'

function getDistribution( data, minTimestamp, interval )
{
  const counts = ( new Array( 100 ).fill(0) )
  . map( count => (
      { count, level: 'info', selected: false })
  )

  data.forEach( entry => {
    const timestamp = timestampOf( entry )
    const index =
      Math.min( Math.floor( ( timestamp - minTimestamp ) / interval ), 99 )

    const target = counts[index]
    target.count += 1

    if( target.level != 'error' ) switch( entry.level )
    {
      case 'error'  : target.level = 'error'  ; break;
      case 'warning': target.level = 'warning'; break;
    }
  })

  const maxCount = Math.max( ...( counts.map( entry => entry.count ) ) )

  return counts.map( entry =>
  {
    const size = Math.floor( entry.count * 10 / maxCount )
    const count = size == 0 && entry.count > 0 ? 1 : size

    return { ...entry, count }
  })
}

function getSourcesFor( data, platform )
{
  const sources = data
  .reduce( ( list, entry ) =>
    {
      return entry.platform != platform || list.includes( entry.source ) ?
        list : [ ...list, entry.source ]
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

function getSources( data )
{
  return {
    content: getSourcesFor( data, 'content' ),
    player : getSourcesFor( data, 'player'  )
  }
}

function loadEntries( state, entries )
{
  // TODO: validate there is data
  const minTimestamp = timestampOf( entries[0] )
  const maxTimestamp = timestampOf( entries[entries.length - 1] )

  const interval = ( maxTimestamp - minTimestamp ) / 100
  const distribution = getDistribution( entries, minTimestamp, interval )
  const sources = getSources( entries )

  const data = entries.map( ( entry, index ) =>
    ({
      ...entry,
      expanded: false,
      index
    })
  )

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

function withToggledSource( state, platform, targetPlatform, name )
{
  const sources = state.filter.sources[ platform ]

   if( platform != targetPlatform )
     return sources

  return sources.map( source =>
    source.name == name ? { ...source, enabled: ! source.enabled } : source
  )
}

function toggleFilterSource( state, platform, name )
{
  return changeFilter( state, {
    sources:
    {
      content: withToggledSource( state, 'content', platform, name ),
      player : withToggledSource( state, 'player' , platform, name )
    }
  })
}

function clearHistogramSelection( state )
{
  return {
    ...state,
    histogram:
    {
      ...state.histogram,
      distribution: state.histogram.distribution.map( entry =>
        ({ ...entry, selected: false })
      )
    }
  }
}

function selectHistogramEntry( state, selectedIndex )
{
  return {
    ...state,
    histogram:
    {
      ...state.histogram,
      distribution: state.histogram.distribution.map( ( entry, index ) =>
        ({
          ...entry,
          selected: ( index == selectedIndex )
        })
      )
    }
  }
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
      sources: {
        content: [],
        player: []
      }
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
      return toggleFilterSource( state, action.platform, action.source )
    case 'entries.histogram.clear':
      return clearHistogramSelection( state )
    case 'entries.histogram.select':
      return selectHistogramEntry( state, action.index )
    case 'entries.load':
      return loadEntries( state, action.data )
  }

  return state
}
