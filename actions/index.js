import { API } from '../middleware/apimiddleware';
import { schema } from 'normalizr';

// const userSchema = new schema.Entity('user_id');
// const categorySchema = new schema.Entity('category_id');
// const itemsSchema = new schema.Entity('likes');

export const getUserData = (id, cookie) => ({
  type: 'GET_USER_DATA',
  id,
  cookie,
  [API]: {
    url: '/me',
    schema: UserSchema,
  }
});


export const getAllCategories = () => ({
  type: 'GET_ALL_CATEGORIES'
});

export const selectACategory = (id) => ({
  type: 'SELECT_A_CATEGORY',
  id
});

export const deselectACategory = (id) => ({
  type: 'DESELECT_A_CATEGORY',
  id
});

export const getAllRecommendedItems = (id) => ({
  type: 'GET_ALL_RECOMMENDED_ITEMS',
  id
});

export const setItemAffinity = (item_id, bool) => ({
  type: 'SET_ITEM_AFFINITY',
  item_id,
  bool
});   // Backend will create "affinity" property with true/false value. We wil get back response 201.



