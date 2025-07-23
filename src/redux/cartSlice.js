import { createSlice } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const initialState = {
  items: [], // {id, name, price, image, quantity}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1); // remove if quantity reaches 0
        }
      }
    },
    removeItemCompletely(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    setCartItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeItemCompletely,
  updateQuantity,
  clearCart,
  setCartItems
} = cartSlice.actions;

// Firebase sync actions
export const syncCartWithFirebase = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (!auth.user?.uid) return;

    const cartDoc = await getDoc(doc(db, 'carts', auth.user.uid));
    if (cartDoc.exists()) {
      dispatch(setCartItems(cartDoc.data().items || []));
    } else {
      dispatch(setCartItems([]));
    }
  } catch (error) {
    console.error('Error syncing cart:', error);
  }
};

export const addToCartFirebase = (item) => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) return;

  dispatch(addToCart(item));

  try {
    const cartRef = doc(db, 'carts', auth.user.uid);
    const { cart } = getState();
    await setDoc(cartRef, {
      items: cart.items,
      userId: auth.user.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating cart in Firebase:', error);
  }
};

export const removeFromCartFirebase = (itemId) => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) return;

  dispatch(removeFromCart({ id: itemId }));

  try {
    const cartRef = doc(db, 'carts', auth.user.uid);
    const { cart } = getState();
    await setDoc(cartRef, {
      items: cart.items,
      userId: auth.user.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating cart in Firebase:', error);
  }
};

export const updateQuantityFirebase = ({ id, size, quantity }) => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) return;

  dispatch(updateQuantity({ id, quantity }));

  try {
    const cartRef = doc(db, 'carts', auth.user.uid);
    const { cart } = getState();
    await setDoc(cartRef, {
      items: cart.items,
      userId: auth.user.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating cart in Firebase:', error);
  }
};

export const removeItemCompletelyFirebase = ({ id, size }) => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) return;

  dispatch(removeItemCompletely(id));

  try {
    const cartRef = doc(db, 'carts', auth.user.uid);
    const { cart } = getState();
    await setDoc(cartRef, {
      items: cart.items,
      userId: auth.user.uid,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating cart in Firebase:', error);
  }
};

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
