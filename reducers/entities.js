const defaultState = {
  currentUser: {},
  friends: {},
  categories: {},
  recommendedItems: {},
  likedItems: {}
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
    recommendedItems: {
      ...state.recommendedItems,
      ...entities.recommendedItems
    },
    categories: {
      ...state.categories,
      ...entities.categories
    },
    likedItems: {
      ...state.likedItems,
      ...entities.likedItems
    }
  };
};

export default entities;
