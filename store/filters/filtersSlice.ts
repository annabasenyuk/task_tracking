import { createSlice } from '@reduxjs/toolkit';

const initialState = 'ALL';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(_state, action) {
      return action.payload;
    }
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;