/**
 * Created by suncg on 2017/6/23.
 */
import homeRoute from '../features/home/route';
import App from '../containers/App';
import { PageNotFound } from '../components';

export const constantRouterMap = [
    homeRoute
]

export const asyncRouterMap = [
    { path: '*', name: 'Page not found', component: PageNotFound, meta: { role: ['admin'] }},
]