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

function getSingleData( entries )
{
  var displayId = null
  var companyId = null
  var player = null
  var os = null

  entries.forEach( entry => {
    if( displayId == null )
      displayId = entry.display_id
    else if( displayId != entry.display_id )
      displayId = -1

    if( companyId == null )
      companyId = entry.company_id ? entry.company_id : -2
    else if( companyId !== -2 && companyId != entry.company_id )
      companyId = -1

    if( player == null )
      player = entry.player.version
    else if( player !== entry.player.version )
      player = -1

    if( os == null )
      os = entry.player.os ? entry.player.os : -2
    else if( os !== -2 && os != entry.player.os )
      os = -1
  })

  return {
    displayId: displayId != -1 && displayId != null,
    companyId: companyId != -1 && companyId != null,
    player   : player    != -1 && player    != null,
    os       : os        != -1 && os        != null
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

  const single = getSingleData( entries )

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
      sources,
      visible: true
    },
    histogram:
    {
      minTimestamp,
      interval,
      distribution
    },
    single
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

function changeViewMode( state, view )
{
  return { ...state, view }
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
      },
      visible: true
    },
    histogram:
    {
      minTimestamp: 0,
      interval: 1,
      distribution: []
    },
    single:
    {
      displayId: false,
      companyId: false,
      player: false,
      os: false
    },
    view: 'list'
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
    case 'entries.view.change':
      return changeViewMode( state, action.mode )
  }

  return state
}
