const defaultState = {
  categoriesPage: {
    categories: [],
    selectedCategories: [],
    loading: false
  },
  currentUserPage: {
    currentUser: [],
    loading: false
  },
  homePage: {
    items: [],
    likedItems: [],
    loading: false
  },
  profilePage: {
    items: []
  },
  friendsPage: {
    friendsList: [],
    isLoading: false
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
        currentUser: action.data.result
      }
    };
  case 'SELECT_A_CATEGORY_SUCCESS': {
    const category_id = action.data[0].category_id;
    return {
      ...state,
      categoriesPage: {
        ...state.categoriesPage,
        selectedCategories: categoriesstatePage.selectedCategories.includes(
          category_id
        )
          ? state.categoriesPage.selectedCategories
          : state.categoriesPage.selectedCategories.concat(category_id)
      }
    };
  }
  case 'DESELECT_A_CATEGORY_SUCCESS': {
    const { category_id } = action;
    return {
      ...state,
      categoriesPage: {
        ...state.categoriesPage,
        selectedCategories: state.categoriesPage.selectedCategories.filter(
          id => id !== category_id
        )
      }
    };
  }
  case 'GET_ALL_RECOMMENDED_ITEMS_SUCCESS':
    return {
      ...state,
      homePage: {
        ...state.homePage,
        items: action.data.result
      }
    };

  case 'GET_LIKED_ITEMS_SUCCESS':
    return {
      ...state,
      profilePage: {
        ...state.profilePage,
        items: action.data.result
      }
    };

  case 'GET_USER_FRIENDS_SUCCESS':
    return {
      ...state,
      friendsPage: {
        ...state.friendsPage,
        friendsList: action.data.result
      }
    };

  case 'SET_ITEM_AFFINITY_SUCCESS':
    return {
      ...state,
      homePage: {
        ...state.homePage,
        likedItems: action.data.result,
        loading: false
      }
    };

  default:
    return state;
  }
};

export default pages;
