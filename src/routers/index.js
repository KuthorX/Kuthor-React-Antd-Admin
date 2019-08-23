import { AsynHomePage, AsynSub1Page } from 'pages'
const pathToRegexp = require('path-to-regexp')

function parsePath(routers, parent) {
  routers.map(router => {
    const ifChild = router.children
    router.parsePath = router.path
    if (parent) {
      router.parsePath = parent.parsePath + router.parsePath
    }
    if (ifChild) {
      parsePath(router.children, router)
    }
  })
}

function setRegexPath(routers) {
  routers.map(router => {
    const parsePath = router.parsePath
    router.regexPath = pathToRegexp(parsePath)
    if (router.children) {
      setRegexPath(router.children)
    }
  })
}

export function genRouterMap(routers) {
  let resultMap = {}
  routers.map(router => {
    resultMap[router.parsePath] = router
    if (router.children) {
      const childMap = genRouterMap(router.children)
      resultMap = { ...resultMap, ...childMap }
    }
  })
  return resultMap
}

export function getRouters() {
  const rawRouters = [
    {
      path: '/',
      name: 'HomePage',
      meta: { title: 'HomePage' },
      view: AsynHomePage,
      icon: 'home',
    },
    {
      path: '/test1',
      name: 'Test1',
      meta: { title: 'Test1' },
      redirect: '/test1/sub1',
      icon: 'menu',
      children: [
        {
          path: '/sub1',
          name: 'Sub1',
          meta: { title: 'sub1' },
          view: AsynSub1Page,
          icon: 'menu',
        },
      ],
    },
  ]
  parsePath(rawRouters)
  setRegexPath(rawRouters)
  return rawRouters
}
