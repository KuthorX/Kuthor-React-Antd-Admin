import Cookie from 'js-cookie'

const appReducer = (
  state = {
    sideMenuCollapse: Cookie.get('sideMenuCollapse') === "true",
  },
  action
) => {
  switch (action.type) {
    case 'setSideMenuCollapse':
      const newState = { ...state }
      Cookie.set('sideMenuCollapse', action.data)
      newState.sideMenuCollapse = action.data
      return newState
    default:
      return state
  }
}

export default appReducer
