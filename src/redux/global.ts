import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  gameId: string | null;
}

const initialState: GlobalState = {
  gameId: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<string | null>) => {
      state.gameId = action.payload;
    },
  },
});

export const { setGameId } = globalSlice.actions;

export type { GlobalState };

export default globalSlice;
