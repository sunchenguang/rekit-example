/**
 * Created by suncg on 2017/6/23.
 */
import { constantRouterMap } from './routeConfig'


const initialState = []

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // Put global reducers here
        default:
            newState = state;
            break;
    }
    return newState
}
