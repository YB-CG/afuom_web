import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string | null;
  stock: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  favorites: string[];
  cart: { [key: string]: number };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  selectedProduct: null,
  favorites: [],
  cart: {},
  loading: false,
  error: null,
};



export const addToFavorites = createAsyncThunk(
  'products/addToFavorites',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.post('/wishlist/add/', { product: productId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'products/removeFromFavorites',
  async (productId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/wishlist/remove/${productId}/`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'products/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/wishlist/list/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  'products/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart/cart/', { product: productId, quantity });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'products/removeFromCart',
  async (cartItemId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/cart/${cartItemId}/delete/`);
      return cartItemId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  'products/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart/cart/list/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'products/updateCartItemQuantity',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/cart/cart/${productId}/update/`, { quantity });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/shop/products/');
      return response.data as Product[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/shop/categories/');
      return response.data as Category[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shop/products/${id}/`);
      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/search/?query=${query}`);
      return response.data as Product[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload.product);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(id => id !== action.payload);
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.map((item: any) => item.product.id);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart[action.payload.product] = action.payload.quantity;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        delete state.cart[action.payload];
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cart[action.payload.product] = action.payload.quantity;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload.reduce((acc: { [key: string]: number }, item: any) => {
          acc[item.product.id] = item.quantity;
          return acc;
        }, {});
      });
      
  },
});

export default productSlice.reducer;