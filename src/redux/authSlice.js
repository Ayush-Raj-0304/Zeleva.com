import { createSlice } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { syncCartWithFirebase } from './cartSlice';
import { syncWishlistWithFirebase } from './wishlistSlice';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.authChecked = true;
      state.error = null;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setUser,
  setAuthChecked,
  logoutSuccess,
} = authSlice.actions;

// Auth state listener
export const initAuthListener = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, get additional user data from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        const completeUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          ...userData,
        };
        
        dispatch(setUser(completeUser));
        
        // Sync cart and wishlist when user logs in
        dispatch(syncCartWithFirebase());
        dispatch(syncWishlistWithFirebase());
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }));
      }
    } else {
      // User is signed out - clear cart and wishlist
      dispatch(setUser(null));
      dispatch({ type: 'cart/clearCart' });
      dispatch({ type: 'wishlist/clearWishlist' });
    }
    dispatch(setAuthChecked(true));
  });
};

// Register user with Firebase
export const register = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;

    // Update the user's display name
    await firebaseUpdateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
    });

    // Save additional user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: new Date().toISOString(),
    });

    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    return { success: false, error: error.message };
  }
};

// Login user with Firebase
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    return { success: false, error: error.message };
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(logoutSuccess());
    // Clear cart and wishlist on logout
    dispatch({ type: 'cart/clearCart' });
    dispatch({ type: 'wishlist/clearWishlist' });
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Reset password
export const resetPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    console.log('🔄 Attempting to send password reset email to:', email);
    
    // Check if Firebase is properly configured
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }
    
    await sendPasswordResetEmail(auth, email);
    
    console.log('✅ Password reset email sent successfully to:', email);
    console.log('📧 Check your inbox and spam folder for the reset link');
    
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    console.error('❌ Password reset failed:', error);
    console.log('Error details:', {
      code: error.code,
      message: error.message,
      email: email
    });
    
    let userFriendlyMessage = error.message;
    
    // Provide more specific error messages
    switch (error.code) {
      case 'auth/user-not-found':
        userFriendlyMessage = 'No account found with this email address. Please check the email or create a new account.';
        break;
      case 'auth/invalid-email':
        userFriendlyMessage = 'Please enter a valid email address.';
        break;
      case 'auth/too-many-requests':
        userFriendlyMessage = 'Too many password reset attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        userFriendlyMessage = 'Network error. Please check your internet connection and try again.';
        break;
      default:
        userFriendlyMessage = `Password reset failed: ${error.message}`;
    }
    
    dispatch(setError(userFriendlyMessage));
    dispatch(setLoading(false));
    return { success: false, error: userFriendlyMessage };
  }
};

// Update user profile
export const updateProfile = (profileData) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    const { user } = getState().auth;
    
    // Update Firestore document
    await updateDoc(doc(db, 'users', user.uid), profileData);
    
    // Update local state
    dispatch(setUser({ ...user, ...profileData }));
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    return { success: false, error: error.message };
  }
};

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthChecked = (state) => state.auth.authChecked;

export default authSlice.reducer; 