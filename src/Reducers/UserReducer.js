const initialState = {
  roles: [],
  isAdmin: false,
  isLoggedIn: false,
  isLoading: false
};

export const UserReducer = (initState = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_DETAILS":
      return {
        ...initState,
        isLoggedIn: action.isLoggedIn,
      };
    case "RESET_USER_DETAILS":
      return { ...initialState };
    case "UPDATE_USER_ROLES":
      return {
        ...initState,
        roles: action.payload,
        isAdmin: action.payload.some((role) => role === "ADMIN")
      };
    case "IS_LOADING":
      return {
        ...initState,
        isLoading: action.payload
      };
    default:
      return initState;
  }
};
