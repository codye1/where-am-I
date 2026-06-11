import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StartGameResponse {
  message: string;
  game: {
    id: string;
    panoramaId: string;
  };
}

interface SubmitGuessResponse {
  message: string;
  guessResult: {
    distanceKm: number;
    targetCoords: { lat: number; lng: number };
    guessCoords: { lat: number; lng: number };
  };
}

const GAME_KEY = 'CURRENT_GAME';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    startGame: builder.query<StartGameResponse, number>({
      query: () => `/game/start`,
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled;
        localStorage.setItem(GAME_KEY, JSON.stringify(data.game));
      },
    }),
    submitGuess: builder.mutation<
      SubmitGuessResponse,
      { gameId: string; lat: number; lng: number }
    >({
      query: ({ gameId, lat, lng }) => ({
        url: `/game/guess?gameId=${gameId}&lat=${lat}&lng=${lng}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useStartGameQuery, useSubmitGuessMutation } = api;

export default api;
