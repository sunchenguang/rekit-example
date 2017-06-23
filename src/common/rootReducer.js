import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import permissionRoutersReducer from './permissionRoutersReducer'
import addRoutersReducer from './addRoutersReducer'
import rolesReducer from './rolesReducer'

import { constantRouterMap } from './routeConfig'

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
  permissionRouters: permissionRoutersReducer,
  addRouters: addRoutersReducer,
  roles: rolesReducer
});

export default rootReducer;
