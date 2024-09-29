export function getDefaultPath(url: string): string {
  const paths = url.split('/')
  if (paths.length > 2) {
    return `/${paths[1]}`
  }
  return '/'
}
