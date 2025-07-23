import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

// Async thunk to save order to Firebase
export const saveOrderToFirebase = createAsyncThunk(
  'orders/saveOrderToFirebase',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const order = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...orderData,
        userId,
        orderDate: new Date().toISOString(),
        status: 'confirmed'
      };

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Update existing user document with new order
        await updateDoc(userDocRef, {
          orders: arrayUnion(order)
        });
      } else {
        // Create new user document with orders array
        await setDoc(userDocRef, {
          orders: [order]
        });
      }

      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch orders from Firebase
export const fetchOrdersFromFirebase = createAsyncThunk(
  'orders/fetchOrdersFromFirebase',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.uid;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.orders || [];
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Save order cases
      .addCase(saveOrderToFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveOrderToFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(saveOrderToFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch orders cases
      .addCase(fetchOrdersFromFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersFromFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      })
      .addCase(fetchOrdersFromFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrders, clearError } = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer; 