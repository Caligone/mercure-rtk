import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost/api" }),
  endpoints: (builder) => ({
    getNumber: builder.query<number, any>({
      query: () => "/number",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const eventSource = new EventSource((window as any).MERCURE_URL);

        try {
          await cacheDataLoaded;

          eventSource.onmessage = (event) => {
            updateCachedData((draft) => {
              return event.data;
            });
            console.log(JSON.parse(event.data));
          };
        } catch {}
        await cacheEntryRemoved;
        eventSource.close();
      },
    }),
    incrementNumber: builder.mutation<number, any>({
      query: () => "/inc",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNumberQuery, useIncrementNumberMutation } = api;
