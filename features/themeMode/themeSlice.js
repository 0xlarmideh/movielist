import { createSlice } from "@reduxjs/toolkit";

// RTK Slice to change the theme mode

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: "light",
  },
  reducers: {
    
    // Function to set the theme mode
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    }
  },
});

// Export the actions from the slice to be used in other components
export const { setThemeMode } = themeSlice.actions;

// Export the reducer from the slice to be used in the store
export default themeSlice.reducer;