/** @format */

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_API_URL } from "../../utils/env";

// Define a service using a base URL andzfveazmk expected endpoints
export const AuthenticationApi = createApi({
	reducerPath: "AuthenticationApi",
	baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API_URL }),
	endpoints: (builder) => ({
		LoginUser: builder.mutation({
			query: (user: { username: string; password: string }) => {
				return {
					url: "auth/login/",
					method: "POST",
					body: user,
				};
			},
		}),

		register: builder.mutation({
			query: ({ data }) => {
				return {
					url: "auth/register/",
					body: data,
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
				};
			},
		}),
		resetPassword: builder.mutation({
			query: ({ uid, token, data }) => {
				return {
					url: `auth/reset_password_confirm/${uid}/${token}/`,
					method: "POST",
					body: data,
				};
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useLoginUserMutation,
	useRegisterMutation,
	useResetPasswordMutation,
} = AuthenticationApi;
