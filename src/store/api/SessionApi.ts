/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BACKEND_URL } from "../constants/env";

import { BACKEND_API_URL } from "../../utils/env";
import { initialState } from "../slices/AuthSlice";
import { IncommingSessionInterface } from "../../interfaces/sessions";

// import { store } from "../store";

export const SessionApi = createApi({
	reducerPath: "SessionApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${BACKEND_API_URL}config/sessions/`,
		prepareHeaders: (headers) => {
			const user = localStorage.getItem("WD_USER");
			if (user) {
				const userParsed = JSON.parse(user) as initialState;
				headers.set("authorization", `Bearer ${userParsed.access}`);
				headers.set("Content-type", "application/json");
				// // console.log(headers.get("authorization"));
			}
			console.log("Headers: ", headers);
			// return headers;
		},
	}),

	endpoints: (builder) => ({
		getSessions: builder.query<IncommingSessionInterface[], void>({
			query: () => `get_sessions/`,
		}),
	}),
});

export const { useGetSessionsQuery } = SessionApi;
