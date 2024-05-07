/** @format */

// src/components/UploadDocument.js
import React from "react";
import { useUploadDocumentMutation } from "../store/api/UploadApi";
import { BACKEND_API_URL } from "../utils/env";
import axios from "axios";
const Upload = () => {
	const [, { isLoading, isError }] = useUploadDocumentMutation();

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		const formData = new FormData();
		if (file) {
			formData.append("file", file);
			axios
				.post(`${BACKEND_API_URL}upload_files/`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then(() => {})
				.catch((e) => {
					console.log("ERRRRO ", e);
				});
			// const res = await uploadDocument(formData);

			// console.log(res);

			// if ("error" in res) {
			// 	console.log(res.error);
			// 	toast.error("Error");
			// }
			// if ("data" in res) {
			// 	toast.success("Suceess");
			// }
		}
	};

	return (
		<div>
			<form encType="multipart/form-data">
				<h2>Upload Document</h2>
				<input type="file" onChange={handleFileChange} />
				{isLoading && <p>Uploading...</p>}
				{isError && <p>Error uploading document</p>}
			</form>
		</div>
	);
};

export default Upload;
