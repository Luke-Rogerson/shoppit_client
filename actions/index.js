import { API } from '../middleware/apimiddleware';
import { schema } from 'normalizr';

const currentUserSchema = new schema.Entity('currentUser', undefined, {idAttribute:'user_id'});

const categorySchema = new schema.Entity('categories', undefined, { idAttribute: 'category_id' });
const categoriesSchema = new schema.Array(categorySchema);

const getRecommendedItemSchema = new schema.Entity('items', undefined, { idAttribute: 'item_id'});
const getAllRecommendedItemsSchema = new schema.Array(getRecommendedItemSchema);

const getLikedItemSchema = new schema.Entity('likes', undefined, { idAttribute: 'item_id' });
const getLikedItemsSchema = new schema.Array(getLikedItemSchema);

const getUserFriendSchema = new schema.Entity('friends', undefined, { idAttribute: 'user_id' });
const getUserFriendsSchema = new schema.Array(getUserFriendSchema);

export const getCurrentUserData = (user_id) => ({
  type: 'GET_CURRENT_USER_DATA',
  [API]: {
    user_id,
    url: '/me',
    schema: currentUserSchema,
  }
});

export const getAllCategories = () => ({
  type: 'GET_ALL_CATEGORIES',
  [API]: {
    url: '/categories',
    schema: categoriesSchema,
  }
});

export const getAllRecommendedItems = (user_id) => ({
  type: 'GET_ALL_RECOMMENDED_ITEMS',
  [API]: {
    url: '/items/recommended',
    schema: getAllRecommendedItemsSchema,
    user_id
  }
});

export const getLikedItems = (user_id) => ({
  type: 'GET_LIKED_ITEMS',
  [API]: {
    url: `/users/${user_id}/items`,
    schema: getLikedItemsSchema,
  }
});

export const getUserFriends = (user_id) => ({
  type: 'GET_USER_FRIENDS',
  [API]: {
    url: '/me/friends',
    schema: getUserFriendsSchema,
    user_id
  }
});

export const selectACategory = (user_id) => ({
  type: 'SELECT_A_CATEGORY',
  user_id
});

export const deselectACategory = (user_id) => ({
  type: 'DESELECT_A_CATEGORY',
  user_id
});

export const setItemAffinity = (item_id, bool) => ({
  type: 'SET_ITEM_AFFINITY',
  item_id,
  bool
});
// Backend will create "affinity" property with true/false value.
// We wil get back response 201.
