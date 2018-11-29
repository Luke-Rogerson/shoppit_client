const defaultState = {
  pages: {
    friends: {
      friendsList: [],
      isLoading: false
    },
    categoriesPage: {
      // categories: [23, 78, 873],
      // selectedCategories: [7, 6, 8],
      categories: [],
      selectedCategories: [],
      loading: false
    }
  }
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
  case 'SELECT_CATEGORY':
    return { ...state, };

  default:
    return state;
  }
};

export default pages;
