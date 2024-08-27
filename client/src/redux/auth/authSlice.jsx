import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  sidebarIsOpen: false,
  name: "",
  token: "",
  user: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    photo: "",
    city: "",
    role: "",
  },
  brand: {
    brandName: "",
    brandLocation: "",
    brandContact: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_SIDEBAR_OPEN(state, action) {
      state.sidebarIsOpen = action.payload;
    },
    SET_TOKEN(state, action) {
      state.token = action.payload;
    },
    SET_BRAND(state, action) {
      state.brand.brandName = action.payload.brandName;
      state.brand.brandLocation = action.payload.brandLocation;
      state.brand.brandContact = action.payload.brandContact;
    },
    SET_NAME(state, action) {
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user._id = profile._id;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.photo = profile.photo;
      state.user.city = profile.city;
      state.user.role = profile.role;
    },
  },
});

export const {
  SET_LOGIN,
  SET_TOKEN,
  SET_NAME,
  SET_USER,
  SET_BRAND,
  SET_SIDEBAR_OPEN,
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.isLoggedIn;
export const selectSidebarIsOpen = (state) => state.sidebarIsOpen;
export const selectToken = (state) => state.token;
export const selectName = (state) => state.name;
export const selectUser = (state) => state.user;
export const selectBrand = (state) => state.brand;

export default authSlice.reducer;
