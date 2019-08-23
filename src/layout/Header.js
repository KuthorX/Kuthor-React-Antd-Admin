import React from 'react'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { Breadcrumb, Alert } from 'antd'
import { getRouters, genRouterMap } from 'routers'

const breadcrumbNameMap = genRouterMap(getRouters())

const Header = withRouter(props => {
  const { location } = props
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url].name}</Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [
    <Breadcrumb.Item key="/">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return (
    <>
      <div className="header">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
        }
        .ant-breadcrumb a,
        .ant-breadcrumb-separator {
          color: #fff;
        }
      `}</style>
    </>
  )
})

export default Header
