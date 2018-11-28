import { API } from '../middleware/apimiddleware';
import { schema } from 'normalizr';

const currentUserSchema = new schema.Entity('currentUser', undefined, {idAttribute:'user_id'});

const categorySchema = new schema.Entity('categories', undefined, { idAttribute: 'category_id' });
const categoriesSchema = new schema.Array(categorySchema);

const getRecommendedItemSchema = new schema.Entity('items', undefined, { idAttribute: 'item_id'});
const getAllRecommendedItemsSchema = new schema.Array(getRecommendedItemSchema);

const getLikedItemSchema = new schema.Entity('likes', undefined, { idAttribute: 'user_id' });
const getLikedItemsSchema = new schema.Array(getLikedItemSchema);


// {
//   categories: [dfsdf]
// }

// const itemsSchema = new schema.Entity('likes');

export const getCurrentUserData = (user_id) => ({
  type: 'GET_CURRENT_USER_DATA',
  user_id,
  [API]: {
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

export const selectACategory = (user_id) => ({
  type: 'SELECT_A_CATEGORY',
  user_id
});

export const deselectACategory = (user_id) => ({
  type: 'DESELECT_A_CATEGORY',
  user_id
});

export const getAllRecommendedItems = (user_id) => ({
  type: 'GET_ALL_RECOMMENDED_ITEMS',
  [API]: {
    url: '/items/recommended',
    schema: getAllRecommendedItemsSchema,
    user_id
  }
});

export const setItemAffinity = (item_id, bool) => ({
  type: 'SET_ITEM_AFFINITY',
  item_id,
  bool
});   // Backend will create "affinity" property with true/false value. We wil get back response 201.

// export const getLikedItems = (user_id) => ({
//   type: 'GET_LIKED_ITEMS',
//   user_id
//   [API]: {
//     url: '',
//     schema: categoriesSchema,
//   }
// });

// export const getUserFriends = (user_id) =>
