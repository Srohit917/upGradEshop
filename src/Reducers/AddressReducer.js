const initialState = {
    addresses: [],
    selectedAddress: {}
  };
  export const AddressReducer = (initState = initialState, action) => {
    switch (action.type) {
      case "ADDRESS_DETAILS":
        return {
          ...initState,
          addresses: action.payload
        };
      case "SELECTED_ADDRESS":
        return {
          ...initState,
          selectedAddress: action.payload
        }
      case "ADD_ADDRESS":
        return { ...initState, addresses: []};
      default:
        return initState;
    }
  };
  