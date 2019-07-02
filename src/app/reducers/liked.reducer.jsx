import { ADD_TO_LIKED, REMOVE_FROM_LIKED, REMOVE_ALL_FROM_LIKED } from '../constants/types';

const likedWithoutItem = (appliedList, item) => appliedList.filter(appliedItem => appliedItem.id !== item.id);
const itemInLiked = (likedList, item) => likedList.filter(likedItem => likedItem.id === item.id)[0];

const addToLiked = (likedList, item) => {
    const likedItem = itemInLiked(likedList, item)
    return likedItem === undefined
        ? [...likedList, item]
        : likedList;
}

const removeFromLiked = (likedList, item) => {
    return likedWithoutItem(likedList,item);
}

const likedReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_LIKED:
          return addToLiked(state,action.newLikedItem);
        case REMOVE_FROM_LIKED:
            return removeFromLiked(state,action.removedItem);
        case REMOVE_ALL_FROM_LIKED:
            return [];
        default:
            return state;
    }
}

export default likedReducer;