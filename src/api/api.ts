import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StartGameResponse {
  gameId: string;
  panoramaId: string;
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    startGame: builder.query<StartGameResponse, void>({
      query: () => `/game/start`,
    }),
  }),
});

export const { useStartGameQuery } = api;

export default api;
