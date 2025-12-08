import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'

export function formatDate(dateString: string, formatStr: string = 'dd MMMM yyyy'): string {
  let actualFormat = formatStr

  if (formatStr === 'short') {
    actualFormat = 'd MMM yyyy'
  } else if (formatStr === 'long') {
    actualFormat = 'd MMMM yyyy'
  }

  return format(parseISO(dateString), actualFormat, { locale: tr })
}

export function getRelativeTime(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), {
    addSuffix: true,
    locale: tr
  })
}

export function getMonthYear(dateString: string): string {
  return format(parseISO(dateString), 'MMMM yyyy', { locale: tr })
}
