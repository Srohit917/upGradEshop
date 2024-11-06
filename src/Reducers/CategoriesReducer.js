const initialState = {
    categories: [],
  };
  export const CategoriesReducer = (initState = initialState, action) => {
    switch (action.type) {
      case "UPDATE_CATEGORY_DETAILS":
        return {
          ...initState,
          categories: action.categories
        };
      case "RESET_CATEGORY_DETAILS":
        return { ...initialState };
      default:
        return initState;
    }
  };
  