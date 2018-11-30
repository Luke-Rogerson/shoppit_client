import { API } from '../middleware/apimiddleware';
import { schema } from 'normalizr';

// Normalizr schemas
const categorySchema = new schema.Entity('categories', undefined, { idAttribute: 'category_id' });
const categoriesSchema = new schema.Array(categorySchema);

const currentUserSchema = new schema.Entity('currentUser', {
  category: [categorySchema]
}, {idAttribute:'user_id'});

const itemSchema = new schema.Entity('items', {
  category: categorySchema
}, {
  idAttribute: 'item_id'
});
const itemsSchema = new schema.Array(itemSchema);

const likedItemSchema = new schema.Entity('likedItems', {
  category: categorySchema
}, {
  idAttribute: 'item_id'
});
const likedItemsSchema = new schema.Array(likedItemSchema);

const getUserFriendSchema = new schema.Entity('friends', undefined, { idAttribute: 'user_id' });
const getUserFriendsSchema = new schema.Array(getUserFriendSchema);

// ----------------------------------------------------

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
    schema: itemsSchema,
    user_id
  }
});

export const getLikedItems = (user_id) => ({
  type: 'GET_LIKED_ITEMS',
  [API]: {
    url: `/users/${user_id}/items`,
    schema: likedItemsSchema,
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

export const selectACategory = (category_id) => ({
  type: 'SELECT_A_CATEGORY',
  [API]: {
    method: 'PUT',
    url: `/me/categories/${category_id}`,
  }
});

export const deselectACategory = (category_id) => ({
  type: 'DESELECT_A_CATEGORY',
  category_id,
  [API]: {
    method: 'DELETE',
    url: `/me/categories/${category_id}`,
  }
});

export const setItemAffinity = (item_id, affinity) => ({
  type: 'SET_ITEM_AFFINITY',
  loading: true,
  [API]: {
    method: 'PUT',
    url: `/items/${item_id}/like/${affinity}`,
    schema: likedItemSchema,
  }
});
