/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_API_URL } from "../../utils/env";

export const UploadApi = createApi({
	reducerPath: "UploadApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_API_URL}` }), // Adjust baseURL to match your Django backend URL
	endpoints: (builder) => ({
		uploadDocument: builder.mutation({
			query: (file) => ({
				url: "upload_files/",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				method: "POST",
				body: file,
			}),
		}),
	}),
});

export const { useUploadDocumentMutation } = UploadApi;
