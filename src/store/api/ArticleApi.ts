/** @format */

// /** @format */

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { BACKEND_URL } from "../constants/env";

// import { BACKEND_API_URL } from "../../utils/env";
// import { initialState } from "../slices/AuthSlice";
// import {
// 	ArticleCreate,
// 	ArticleIncomming,
// } from "../../utils/interfaces/articleInterface";

// // import { store } from "../store";

// export const ArticleApi = createApi({
// 	reducerPath: "ArticleApi",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: `${BACKEND_API_URL}app/article/`,
// 		prepareHeaders: (headers) => {
// 			const user = localStorage.getItem("WD_USER");
// 			if (user) {
// 				const userParsed = JSON.parse(user) as initialState;
// 				// console.log("USER PARSED ", userParsed);
// 				headers.set("authorization", `Bearer ${userParsed.access}`);
// 				headers.set("Content-type", "application/json");
// 				console.log(headers.get("authorization"));
// 			}
// 			return headers;
// 		},
// 	}),

// 	endpoints: (builder) => ({
// 		CreateArticle: builder.mutation({
// 			query: (artcicle: ArticleCreate) => {
// 				return {
// 					url: "create_article/",
// 					method: "POST",
// 					body: artcicle,
// 				};
// 			},
// 		}),
// 		getArticle: builder.query<ArticleIncomming[], void>({
// 			query: () => "admin_get_articles/",
// 		}),
// 		userGetArticle: builder.query<ArticleIncomming[], void>({
// 			query: () => "get_articles/",
// 		}),
// 		getSingleArticle: builder.query<ArticleIncomming, string>({
// 			query: (id: string) => `get_single_article/${id}/`,
// 		}),
// 	}),
// });

// export const {
// 	useCreateArticleMutation,
// 	useGetArticleQuery,
// 	useUserGetArticleQuery,
// 	useGetSingleArticleQuery,
// } = ArticleApi;
