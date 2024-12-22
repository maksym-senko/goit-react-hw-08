// redux/filters/selectors.js
export const selectSearchQuery = (state) => state.filters?.searchQuery || "";
export const selectNameFilter = (state) => state.filters?.nameFilter || "";
