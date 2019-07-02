import { ADD_TO_APPLIED, REMOVE_FROM_APPLIED, REMOVE_ALL_FROM_APPLIED, ADD_ALL_TO_APPLIED } from '../constants/types';

export const addToApplied = (newAppliedItem) => {
    return {
        type: ADD_TO_APPLIED,
        newAppliedItem
    }
};

export const removeFromApplied = (removedItem) => {
    return {
        type: REMOVE_FROM_APPLIED,
        removedItem
    }
};

export const addAllToApplied = (items) => {
    return {
        type: ADD_ALL_TO_APPLIED,
        items
    }
};

export const removeAllFromApplied = () => {
    return {
        type: REMOVE_ALL_FROM_APPLIED
    }
};
