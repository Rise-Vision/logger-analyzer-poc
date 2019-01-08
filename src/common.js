const DIGITS = /(\d+)[.](\d+)/

export function timestampOf( entry )
{
  const match = DIGITS.exec( entry.ts )

  const fraction = match[2]
  const text = match[1].concat( fraction )
  .concat(
    fraction.length == 1 ? '00' :
    fraction.length == 2 ? '0'  : ''
  )

  return Number( text )
}
