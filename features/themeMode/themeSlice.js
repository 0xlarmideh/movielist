import { createSlice } from "@reduxjs/toolkit";

// RTK Slice to change the theme mode

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  },
  reducers: {
    
    // Function to set the theme mode
    toggleThemeMode: (state) => {
      state.isDark = !state.isDark;
    }
  },
});

// Export the actions from the slice to be used in other components
export const { toggleThemeMode } = themeSlice.actions;

// Export the reducer from the slice to be used in the store
export default themeSlice.reducer;