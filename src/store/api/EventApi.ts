/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BACKEND_URL } from "../constants/env";

import { BACKEND_API_URL } from "../../utils/env";

// import { store } from "../store";

export const EventApi = createApi({
	reducerPath: "EventApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${BACKEND_API_URL}`,
		prepareHeaders: async (headers) => {
			// const user = await AsyncStorage.getItem("token");
			// if (user) {
			// 	const userParsed = JSON.parse(user) as initialState;
			// 	headers.set("authorization", `Bearer ${userParsed.access}`);
			// 	headers.set("Content-type", "application/json");
			// 	// // console.log(headers.get("authorization"));
			// }
			// console.log('Headers: ', headers.map);
			return headers;
		},
	}),

	endpoints: () => ({}),
});

export const {} = EventApi;
