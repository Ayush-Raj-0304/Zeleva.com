import { createSlice, createSelector } from '@reduxjs/toolkit';
import productsData from '../data/products';

const initialState = {
  items: productsData,
  search: '',
  category: '', // filter for selected category
  view: 'grid', // view mode
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
  },
});

export const { setSearch, setCategory, setView } = productsSlice.actions;

// ✅ Selector to get search term
export const selectSearchTerm = (state) => state.products.search;

// ✅ Selector to get selected category
export const selectSelectedCategory = (state) => state.products.category;

// ✅ Memoized filtered product list
export const selectFilteredProducts = createSelector(
  [
    (state) => state.products.items,
    (state) => state.products.search,
    (state) => state.products.category,
  ],
  (items, search, category) => {
    const searchLower = search.toLowerCase();
    return items.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower);
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }
);

export default productsSlice.reducer;
