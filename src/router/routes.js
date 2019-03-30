import store from '@state/store'

export default [
  // Routes from hacking
  {
    path: '/panicButton',
    name: 'panicButton',
    component: () => lazyLoadView(import('@views/saveWomenViews/panicButton')),
  },
  {
    path: '/editNumbers',
    name: 'editEmergencyNumbers',
    component: () =>
      lazyLoadView(import('@views/saveWomenViews/editEmergencyNumbers')),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/saveWomenViews/profile')),
  },
  // No take in count
  {
    path: '/home',
    name: 'home',
    component: () => lazyLoadView(import('@views/home')),
  },
  {
    path: '/certificados',
    name: 'certificados',
    component: () => lazyLoadView(import('@views/certificados')),
  },
  {
    path: '/logInOptions',
    name: 'logInOptions',
    component: () => lazyLoadView(import('@views/loginOptions')),
  },
  {
    path: '/logup',
    name: 'logup',
    component: () => lazyLoadView(import('@views/logUp')),
  },
  {
    path: '/confirmation',
    name: 'confirm-user-data',
    component: () => lazyLoadView(import('@views/confirmUserData')),
  },
  {
    path: '/confirmation/code',
    name: 'confim-log-up-code',
    component: () => lazyLoadView(import('@views/confirmLogUpCode')),
  },
  {
    path: '/tabsView',
    name: 'tabs-view',
    component: () => lazyLoadView(import('@views/tabsView')),
  },
  {
    path: '/confirmation/code/bottom-bar',
    name: 'bottom-bar',
    component: () => lazyLoadView(import('@views/bottomBar')),
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({
            name: 'home',
          })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/profile')),
    meta: {
      authRequired: true,
    },
    props: (route) => ({
      user: store.state.auth.currentUser || {},
    }),
  },
  {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => lazyLoadView(import('@views/profile')),
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store
          // Try to fetch the user's information by their username
          .dispatch('users/fetchUser', {
            username: routeTo.params.username,
          })
          .then((user) => {
            // Add the user to the route params, so that it can
            // be provided as a prop for the view component below.
            routeTo.params.user = user
            // Continue to the route.
            next()
          })
          .catch(() => {
            // If a user with the provided username could not be
            // found, redirect to the 404 page.
            next({
              name: '404',
              params: {
                resource: 'User',
              },
            })
          })
      },
    },
    // Set the user from the route params, once it's set in the
    // beforeResolve route guard.
    props: (route) => ({
      user: route.params.user,
    }),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: false,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logUp')
        next({
          name: 'logout',
        })
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
