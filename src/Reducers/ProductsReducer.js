const initialState = {
  products: [],
  filterType: "all",
  sortBy: "default",
  filterProducts: [],
  quantity: "1",
  selectedProduct: {},
  searchItem: "",
};

export const ProductReducer = (initState = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_DETAILS":
      return {
        ...initState,
        products: action.products,
        filterProducts: action.products,
      };
    case "RESET_PRODUCT_DETAILS":
      return {
        ...initState,
        products: [],
        filterProducts: [],
        selectedProduct: {},
      };
    case "UPDATE_QUANTITY":
      return {
        ...initState,
        quantity: action.quantity,
      };
    case "UPDATE_BUYING_PRODUCT":
      return {
        ...initState,
        selectedProduct: action.payload,
      };
    case "UPDATE_FILTERED_PRODUCTS": {
      const sortBy = action.sortBy;
      const filterType = action.filterType || "all";
      const searchItem = action.searchItem;
      const filterProductsByCategory =
        filterType == "all"
          ? [...initState.products]
          : [...initState.products].filter(
              (item) => item.category == filterType
            );

      const sortedProducts =
        sortBy == "lToH"
          ? filterProductsByCategory.sort((a, b) => a.price - b.price)
          : sortBy == "hToL"
          ? filterProductsByCategory.sort((a, b) => b.price - a.price)
          : sortBy == "newest"
          ? filterProductsByCategory.sort((a, b) => {
              const dateA = a.lastUpdated
                ? new Date(a.lastUpdated)
                : new Date(-8640000000000000);
              const dateB = b.lastUpdated
                ? new Date(b.lastUpdated)
                : new Date(-8640000000000000);
              return dateB - dateA;
            })
          : filterProductsByCategory;
      const result = sortedProducts.filter((pro) =>
        pro.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      return {
        ...initState,
        filterType: filterType,
        filterProducts: result,
        sortBy: sortBy,
        searchItem: searchItem,
      };
    }
    case "UPDATE_PRODUCTS_AFTER_SEARCH": {
      console.log("Check.. ", action);
      return {
        ...initState,
        filterProducts: action.payload,
      };
    }
    default:
      return initState;
  }
};
