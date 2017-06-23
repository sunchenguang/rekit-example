import App from '../containers/App';

import { PageNotFound } from '../components';
import homeRoute from '../features/home/route';
import store from './configStore'
import { constantRouterMap, asyncRouterMap } from './routerMap'

// export const constantRouterMap = [
//     homeRoute
// ]
//
// export const asyncRouterMap = [
//     { path: '*', name: 'Page not found', component: PageNotFound },
// ]
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

function filterAsyncRouter(asyncRouterMap, roles) {
    let accessedRouters = asyncRouterMap.filter(route => {
        if(hasPermission(roles, route)) {
            if(route.childRoutes && route.childRoutes.length) {
                route.childRoutes = filterAsyncRouter(route.childRoutes, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

function filterRoutes(nextState, replace) {
    let roles = store.getState().roles
    let accessedRouters
    if (roles.indexOf('admin') >= 0) {
        accessedRouters = asyncRouterMap
    } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
    }

    //拼接路由
    routes[0].childRoutes = routes[0].childRoutes.concat(accessedRouters)
}
const routes = [{
    path: '/',
    component: App,
    onEnter: filterRoutes,
    childRoutes: constantRouterMap,
}];

// Handle isIndex property of route config:
//  1. remove the first child with isIndex=true from childRoutes
//  2. assign it to the indexRoute property of the parent.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  route.childRoutes = route.childRoutes.filter(child => { // eslint-disable-line
    if (child.isIndex) {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'dev' && route.indexRoute) {
        console.error('More than one index route: ', route);
      }

      /* istanbul ignore else */
      if (!route.indexRoute) {
        delete child.path; // eslint-disable-line
        route.indexRoute = child; // eslint-disable-line
        return false;
      }
    }
    return true;
  });

  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
