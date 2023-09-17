import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const validSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addItem } = validSlice.actions;

export default validSlice.reducer;
