import { ADD_TO_LIKED, REMOVE_FROM_LIKED, REMOVE_ALL_FROM_LIKED } from '../constants/types';

export const addToLiked = (newLikedItem) => {
    return {
        type: ADD_TO_LIKED,
        newLikedItem
    }
};

export const removeFromLiked = (removedItem) => {
    return {
        type: REMOVE_FROM_LIKED,
        removedItem
    }
};


export const removeAllFromLiked = () => {
    return {
        type: REMOVE_ALL_FROM_LIKED,
    }
};
