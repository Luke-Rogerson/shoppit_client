import { API } from '../middleware/apimiddleware';
import { schema } from 'normalizr';

// const userSchema = new schema.Entity('user_user_id');
const categorySchema = new schema.Entity('categories', undefined, { idAttribute: 'category_id' });
const categoriesSchema = new schema.Array(categorySchema);

// {
//   categories: [dfsdf]
// }

// const itemsSchema = new schema.Entity('likes');

export const getUserData = (user_id) => ({
  type: 'GET_USER_DATA',
  user_id,
  [API]: {
    url: '/me',
    schema: UserSchema,
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
  user_id
});

export const setItemAffinity = (item_id, bool) => ({
  type: 'SET_ITEM_AFFINITY',
  item_id,
  bool
});   // Backend will create "affinity" property with true/false value. We wil get back response 201.

export const getLikedItems = (user_id) => ({
  type: 'GET_LIKED_ITEMS',
  user_id
});

