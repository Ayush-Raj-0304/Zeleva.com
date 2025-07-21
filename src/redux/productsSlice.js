import { createSlice, createSelector } from '@reduxjs/toolkit';
import productsData from '../data/products';

const initialState = {
  items: productsData,
  search: '',
  view: 'grid', // 'grid' or 'list'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
  },
});

export const { setSearch, setView } = productsSlice.actions;

// Memoized selector
export const selectFilteredProducts = createSelector(
  [state => state.products.items, state => state.products.search],
  (items, search) => {
    const searchLower = search.toLowerCase();
    return items.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  }
);

export default productsSlice.reducer; 