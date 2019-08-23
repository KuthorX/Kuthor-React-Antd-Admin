import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import LoadingComponent from 'components/LoadingComponent'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import echarts from 'echarts/lib/echarts'
import { theme } from 'constant/echart-theme'

echarts.registerTheme('theme', theme)

const { Header, Content, Footer, Sider } = Layout

const mapStateToProps = state => ({
  appReducer: state.appReducer,
})

const mapDispatchToProps = dispatch => ({
  setSideMenuCollapse: data => {
    dispatch({ type: 'setSideMenuCollapse', data })
  },
})

function App(props) {
  const collapsed = props.appReducer.sideMenuCollapse

  function onCollapse(c) {
    props.setSideMenuCollapse(c)
  }

  useEffect(() => {}, [])

  const AsynHeader = Loadable({
    loader: () => import(/* webpackChunkName: "Header" */ './layout/Header'),
    loading: LoadingComponent,
  })
  const MyHeader = useMemo(() => <AsynHeader />, [])

  const AsynSideMenu = Loadable({
    loader: () =>
      import(/* webpackChunkName: "SideMenu" */ './layout/SideMenu'),
    loading: LoadingComponent,
  })
  const SideMenu = useMemo(() => <AsynSideMenu />, [])

  const AsynMainArea = Loadable({
    loader: () =>
      import(/* webpackChunkName: "MainArea" */ './layout/MainArea'),
    loading: LoadingComponent,
  })
  const MainArea = useMemo(() => <AsynMainArea />, [])

  return (
    <>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            {SideMenu}
          </Sider>
          <Layout>
            <Header>{MyHeader}</Header>
            <Content>{MainArea}</Content>
            <Footer>Kuthor React Antd Admin | 2019</Footer>
          </Layout>
        </Layout>
      </Router>
      <style jsx>{`
        body {
          background: #aaa;
        }
      `}</style>
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
