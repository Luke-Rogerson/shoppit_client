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
    user: {
      ...state.user,
      ...entities.user
    },
    items: {
      ...state.items,
      ...entities.items
    }
  };
};

export default entities;
