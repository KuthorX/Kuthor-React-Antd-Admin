import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import { getRouters } from 'routers'
import { connect } from 'react-redux'

const { SubMenu } = Menu

const mapStateToProps = state => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = dispatch => ({
  setSideMenuCollapse: data => {
    dispatch({ type: 'setSideMenuCollapse', data })
  },
})

function genSideMenu(routers, collapsed, isChild, location) {
  const finalView = []
  routers.map(router => {
    const ifChild = router.children
    if (!ifChild) {
      let iconView
      if (!isChild) {
        if (!collapsed) {
          iconView = (
            <Link to={`${router.parsePath}`}>
              <Icon type={router.icon} />
            </Link>
          )
        } else {
          iconView = (
            <Link to={`${router.parsePath}`} className="no-text-style">
              <Icon type={router.icon} />
            </Link>
          )
        }
      }
      let linkView
      if (!collapsed || isChild) {
        if (router.regexPath.exec(location.pathname) !== null) {
          linkView = (
            <Link
              to={`${router.parsePath}`}
              className="no-text-style no-text-style-active"
            >
              {router.name}
            </Link>
          )
        } else {
          linkView = (
            <Link to={`${router.parsePath}`} className="no-text-style">
              {router.name}
            </Link>
          )
        }
      }
      finalView.push(
        <Menu.Item key={`${router.parsePath}`} title={router.name}>
          <span>
            {iconView}
            {linkView}
          </span>
          <style jsx>{`
            .no-text-style {
              text-decoration: none;
              color: rgba(255, 255, 255, 0.65);
              width: 100%;
              display: inline-block;
            }
            .no-text-style:hover,
            .no-text-style-active {
              color: rgba(255, 255, 255, 1);
            }
          `}</style>
        </Menu.Item>
      )
    } else {
      const childViews = genSideMenu(router.children, collapsed, true, location)
      let titleView
      if (!collapsed) {
        titleView = <span>{router.name}</span>
      }
      const rootView = (
        <SubMenu
          key={`${router.parsePath}`}
          title={
            <span>
              <Icon type={router.icon} />
              {titleView}
            </span>
          }
        >
          {childViews}
        </SubMenu>
      )
      finalView.push(rootView)
    }
  })

  return finalView
}

const SideMenu = withRouter(props => {
  const location = props.location
  const collapsed = props.appReducer.sideMenuCollapse

  const pathname = location.pathname

  const pathSnippets = pathname.split('/').filter(i => i)
  let currentPath = ''
  const openKeys = []
  for (let i = 0; i < pathSnippets.length; i++) {
    currentPath += `/${pathSnippets[i]}`
    openKeys.push(currentPath)
  }

  let finalView = genSideMenu(getRouters(), collapsed, false, location)

  let titleView
  if (collapsed) {
    titleView = <span className="title">Ku</span>
  } else {
    titleView = <span className="title">KRAA</span>
  }

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[pathname]}
        defaultOpenKeys={openKeys}
      >
        <Menu.Item key={`kraa`}>{titleView}</Menu.Item>
        {finalView}
      </Menu>
      <style jsx>{`
        .title {
          color: #fff;
        }
      `}</style>
    </>
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)
