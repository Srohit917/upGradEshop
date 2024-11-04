const initialState = {
  roles: [],
  isAdmin: false,
  isLoggedIn: false,
};
export const UserReducer = (initState = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_DETAILS":
      return {
        ...initState,
        isLoggedIn: action.isLoggedIn,
        isAdmin: action.isAdmin,
        roles: action.roles,
      };
    case "RESET_USER_DETAILS":
      return { ...initState, roles: [], isAdmin: false, isLoggedIn: false };
    default:
      return initState;
  }
};
