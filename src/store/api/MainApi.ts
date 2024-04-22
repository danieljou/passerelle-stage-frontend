/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_API_URL } from "../../utils/env";
import { initialState } from "../slices/AuthSlice";
import { EnterpriseArray } from "../../interfaces/Enterprises";
import { InterpriseDetails } from "../../interfaces/InterpriseDetails";

export const MainApi = createApi({
	reducerPath: "MainApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${BACKEND_API_URL}app/`,
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
		getEnterprises: builder.query<EnterpriseArray, void>({
			query: () => `enterprises/`,
		}),
		getSingleEnterprise: builder.query<InterpriseDetails, string>({
			query: (id: string) => `enterprises/${id}/`,
		}),
	}),
});

export const { useGetEnterprisesQuery, useGetSingleEnterpriseQuery } = MainApi;
