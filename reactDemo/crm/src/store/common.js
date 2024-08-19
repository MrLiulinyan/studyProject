import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabValue: '首页',
  browsingLst: [{ key: '首页', label: '首页', children: null, closable: false }],
};

const reducers = {
  addBrowsing: (state, action) => {
    const { id, pathname } = action.payload;
    const item = state.browsingLst.find((e) => e.key === id);
    if (!item) state.browsingLst.push({ key: id, label: id, path: pathname, children: null, closable: true });
  },
  removeBrowsing: (state, action) => {
    const { index } = action.payload;
    state.browsingLst.splice(index, 1);
  },
  updateTabValue: (state, action) => {
    const { id } = action.payload;
    state.tabValue = id;
  },
};

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers,
});

export const { addBrowsing, removeBrowsing, updateTabValue } = commonSlice.actions;
export default commonSlice.reducer;
