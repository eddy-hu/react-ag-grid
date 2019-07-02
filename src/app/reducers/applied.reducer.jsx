import { ADD_TO_APPLIED, REMOVE_FROM_APPLIED, REMOVE_ALL_FROM_APPLIED } from '../constants/types';


const appliedWithoutItem = (appliedList, item) => appliedList.filter(appliedItem => appliedItem.id !== item.id);
const itemInApplied = (appliedList, item) => appliedList.filter(appliedItem => appliedItem.id === item.id)[0];

const addToApplied = (appliedList, item) => {
    const appliedItem = itemInApplied(appliedList, item)
    return appliedItem === undefined
        ? [...appliedList, item]
        : appliedList;
}

const removeFromApplied = (appliedList, item) => {
    return appliedWithoutItem(appliedList, item);
}

const appliedReducer = (state = [], action = {}) => {
    switch (action.type) {
        case ADD_TO_APPLIED:
            return addToApplied(state, action.newAppliedItem);
        case REMOVE_FROM_APPLIED:
            return removeFromApplied(state, action.removedItem)
        case REMOVE_ALL_FROM_APPLIED:
            return [];
        default:
            return state;
    }
}

export default appliedReducer;