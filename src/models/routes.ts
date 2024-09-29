type Route = {
  path?: string
  component?: any
  guard?: any
  roles?: string[]
}

export type RouteItem = Route & {
  routes?: (Route & { routes?: Route[] })[]
}
