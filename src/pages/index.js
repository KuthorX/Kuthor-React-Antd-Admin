import Loadable from 'react-loadable'
import LoadingComponent from 'components/LoadingComponent'

export const AsynHomePage = Loadable({
  loader: () => import(/* webpackChunkName: "HomePage" */ '../pages/HomePage'),
  loading: LoadingComponent,
})

export const AsynSub1Page = Loadable({
  loader: () => import(/* webpackChunkName: "Sub1Page" */ '../pages/Sub1Page'),
  loading: LoadingComponent,
})
