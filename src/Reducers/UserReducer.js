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
      };
    case "RESET_USER_DETAILS":
      return { ...initialState };
    case "UPDATE_USER_ROLES":
      return {
        ...initState,
        roles: action.payload,
        isAdmin: action.payload.map((role) => role.name).indexOf("ADMIN") != -1,
      };
    default:
      return initState;
  }
};
