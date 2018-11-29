const defaultState = {
  pages: {
    friends: {
      friendsList: [],
      isLoading: false
    },
    categoriesPage: {
      categories: [23, 78, 873],
      selectedCategories: [7, 6, 8],
      loading: false,
      // GET_CATEGORIES_FAILURE
    }
  }
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default pages;
