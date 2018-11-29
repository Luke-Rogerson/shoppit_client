const defaultState = {
  currentUser: {},
  friends: {},
  categories: {},
  items: {}
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
    categories: {
      ...state.categories,
      ...entities.categories
    },
    items: {
      ...state.items,
      ...entities.items
    }
  };
};

export default entities;
