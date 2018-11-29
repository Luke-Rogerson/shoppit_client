const defaultState = {
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
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
    // case 'SELECT_CATEGORY':
    //   return { ...state, };
    case 'GET_ALL_CATEGORIES_SUCCESS':
      return {
        ...state,
        categoriesPage: {
          ...state.categoriesPage,
          categories: action.data.result
        }
      };
    // case 'DESELECT_A_CATEGORY_SUCCESS':
    //   return {
    //     ...state,
    //     categoriesPage: {
    //       ...state.categoriesPage,
    //       selectedCategories: action.data.result
    //     }
    //   };
    default:
      return state;
  }
};

export default pages;
