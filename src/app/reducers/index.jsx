import { combineReducers } from 'redux';
import appliedReducer from './applied.reducer';
import likedReducer from './liked.reducer';

export default combineReducers({
    applied: appliedReducer,
    liked: likedReducer
});

