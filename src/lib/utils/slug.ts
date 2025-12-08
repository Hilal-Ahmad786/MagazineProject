import slugify from 'slugify'

export function createSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'tr',
  })
}

export function validateSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
