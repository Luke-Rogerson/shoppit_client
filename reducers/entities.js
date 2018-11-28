const defaultState = {
  users: {},
  categories: {},
  items: {},
};

const entities = (state = defaultState, action) => {

  if (!action.data || !action.data.entities) return state;

  const entities = action.data.entities;

  return  {
    ...state,
    users: {
      ...state.users,
      ...entities.users
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
