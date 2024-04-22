/** @format */

import { configureStore } from "@reduxjs/toolkit";

import ThemeSlice from "./slices/ThemeSlice";
import AuthSlice from "./slices/AuthSlice";
import { AuthenticationApi } from "./api/AuthenticationApi";
import { MainApi } from "./api/MainApi";
// import { ArticleApi } from "./api/ArticleApi";

export const store = configureStore({
	reducer: {
		ThemeSlice,
		AuthSlice,
		[AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
		[MainApi.reducerPath]: MainApi.reducer,
		// [ArticleApi.reducerPath]: ArticleApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			AuthenticationApi.middleware,
			MainApi.middleware
			// ArticleApi.middleware
		),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
