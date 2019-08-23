import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { getRouters, genRouterMap } from 'routers'

const MainArea = withRouter(props => {
  const { location } = props
  const routers = getRouters()
  const routerMap = genRouterMap(routers)
  const pathName = location.pathname
  const pathData = routerMap[pathName]

  let routeView
  if (pathData.redirect) {
    routeView = <Redirect to={pathData.redirect} />
  } else {
    const RouteView = pathData.view
    routeView = <RouteView />
  }

  return <>{routeView}</>
})

export default MainArea
