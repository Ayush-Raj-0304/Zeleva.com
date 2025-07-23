import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';

// Async thunk to sync wishlist with Firebase
export const syncWishlistWithFirebase = createAsyncThunk(
  'wishlist/syncWithFirebase',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      
      if (!userId) {
        console.log('No user ID found for wishlist sync');
        return [];
      }

      console.log('Syncing wishlist for user:', userId);
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Wishlist data found:', userData.wishlist || []);
        return userData.wishlist || [];
      } else {
        console.log('No user document found for wishlist');
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add to wishlist in Firebase
export const addToWishlistFirebase = createAsyncThunk(
  'wishlist/addToFirebase',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          wishlist: arrayUnion(product)
        });
      } else {
        await setDoc(userDocRef, {
          wishlist: [product]
        });
      }

      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to remove from wishlist in Firebase
export const removeFromWishlistFirebase = createAsyncThunk(
  'wishlist/removeFromFirebase',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { auth, wishlist } = getState();
      const userId = auth.user?.uid;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const productToRemove = wishlist.items.find(item => item.id === productId);
      if (!productToRemove) {
        throw new Error('Product not found in wishlist');
      }

      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        wishlist: arrayRemove(productToRemove)
      });

      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [], // Array of liked product objects
  isLoading: false,
  error: null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (!existing) {
        state.items.push(product);
      }
    },
    removeFromWishlist(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    clearWishlist(state) {
      state.items = [];
      state.error = null;
    },
    setWishlistItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sync wishlist cases
      .addCase(syncWishlistWithFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncWishlistWithFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(syncWishlistWithFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to wishlist cases
      .addCase(addToWishlistFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        const existing = state.items.find(item => item.id === action.payload.id);
        if (!existing) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToWishlistFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Remove from wishlist cases
      .addCase(removeFromWishlistFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeFromWishlistFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlistItems } = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;

export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some(item => item.id === productId);

export const selectWishlistCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer; 