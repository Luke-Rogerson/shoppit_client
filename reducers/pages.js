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
  },
  currentUserPage: {
    currentUser: [],
    loading: false
  }
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
  case 'GET_ALL_CATEGORIES_SUCCESS':
    return {
      ...state,
      categoriesPage: {
        ...state.categoriesPage,
        categories: action.data.result
      }
    };
  case 'GET_CURRENT_USER_DATA_SUCCESS':
    return {
      ...state,
      currentUserPage: {
        ...state.currentUserPage,
        currentUser: action.data.entities.currentUser
      }
    };
    case 'DESELECT_A_CATEGORY_SUCCESS':
      return {
        ...state,
        categoriesPage: {
          ...state.categoriesPage,
          selectedCategories: action.data.result
        }
      };
  default:
    return state;
  }
};

export default pages;
