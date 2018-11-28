const defaultState = {
  currentUser: {},
  friends: {},
  categories: {},
  items: {},

};

const entities = (state = defaultState, action) => {

  if (!action.data || !action.data.entities) return state;

  const entities = action.data.entities;

  return  {
    ...state,
    currentUser: {
      ...state.currentUser,
      ...entities.currentUser
    },
    friends: {
      ...state.friends,
      ...entities.friends
    },
    items: {
      ...state.items,
      ...entities.items
    },
    categories: {
      ...state.categories,
      ...entities.categories
    }
  };
};

export default entities;
