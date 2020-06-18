import { combineReducers } from 'redux';
import productStore from './productStore';
export default combineReducers({
    productStore,
    //다른 리듀서를 만들게 되면 여기에 import
});