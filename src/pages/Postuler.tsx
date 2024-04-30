/** @format */

import { useParams } from "react-router-dom";
import {
	useCreateInternshipMutation,
	useGetSingleInternshipQuery,
} from "../store/api/MainApi";
import { Box, Button, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import * as yup from "yup";
import { useFormik } from "formik";
import { InternshipCreate } from "../interfaces/Internship";
import { useAppSelector } from "../store/hooks";
import toast from "react-hot-toast";
import { useState } from "react";
const Postuler = () => {
	const { id } = useParams();
	const { data, isLoading, isSuccess } = useGetSingleInternshipQuery(
		id as string
	);
	const [postulate, { isLoading: its }] = useCreateInternshipMutation();

	const validationSchema = yup.object().shape({
		// username: yup.string().required("Le nom d'utilisateur est requis"),
		// password: yup.string().required("Le mot de passe est requis"),
		// cv: yup.mixed().test("fileType", "Selectionnez un fichier pdf", (value) => {
		// 	return value && "type" in value && value.type === "application/pdf";
		// }),
	});

	const [td, settd] = useState<{
		cv: null | File;
		lm: null | File;
		cs: null | File;
		ds: null | File;
	}>({
		cv: null,
		lm: null,
		cs: null,
		ds: null,
	});
	const userID = useAppSelector((state) => state.AuthSlice.user_infos?.id);

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
			cv: "",
			lm: "",
			ds: "",
			cs: "",
		},
		validationSchema: validationSchema,
		onSubmit: () => {
			handleSubmit();
		},
	});
	const handleSubmit = async () => {
		const formData = new FormData();

		const data: InternshipCreate = {
			demand: {
				intermship: id as string,
				owner: userID as unknown as string,
			},

			docs: [
				{
					file: td.cs,
					title: "CERTIFICAT DE SCOLARITE",
				},
				{
					file: td.lm,
					title: "LETTRE DE MOTIVATION",
				},
				{
					file: td.ds,
					title: "DEMANDE DE STAGE",
				},
				{
					file: td.cv,
					title: "CV",
				},
			],
		};
		console.log(data);
		formData.append("demand", JSON.stringify(data.demand));
		formData.append("doc", JSON.stringify(data.docs));
		const res = await postulate(formData);
		if ("error" in res) {
			console.log(res.error);
			toast.error("Error");
		}
		if ("data" in res) {
			toast.success("Suceess");
		}
	};
	return (
		<div>
			{isLoading && (
				<>
					<Box padding="6">
						<SkeletonCircle size="10" />
						<SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
					</Box>
				</>
			)}
			{isSuccess && (
				<div className="p-7">
					<div className="font-bold text-2xl">Postulez</div>
					<p>
						{data.enterprise.name} - stage {data.type}
					</p>
					<form action="">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{data.cv && (
								<div className="mb-4">
									<label className="mb-2.5 block font-medium text-black dark:text-white">
										Cv
									</label>
									<div className="relative">
										<input
											// {...formik.getFieldProps("cv")}
											onChange={(e) => {
												settd({
													...td,
													cv: e.target.files ? e.target.files[0] : null,
												});
											}}
											type="file"
											accept=".pdf"
											placeholder="Enter your username"
											className={`w-full rounded-lg border ${
												formik.errors.cv
													? "border-red-500 focus:border-red-500"
													: "border-red-500stroke focus:border-red-500blue-500"
											} bg-transparent py-4 pl-6 pr-10 text-black outline-none  focus-visible:shadow-none dark:border-red-500form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500blue-500`}
										/>

										<span className="absolute right-4 top-4">
											<svg
												className="fill-current"
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<g opacity="0.5">
													<path
														d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
														fill=""
													/>
												</g>
											</svg>
										</span>
									</div>
									{formik.errors.cv && (
										<p className="text-red-500 text-sm"> {formik.errors.cv} </p>
									)}
								</div>
							)}
							{data.certificat_scolarite && (
								<div className="mb-4">
									<label className="mb-2.5 block font-medium text-black dark:text-white">
										Certificat de scolarité
									</label>
									<div className="relative">
										<input
											// {...formik.getFieldProps("sc")}
											onChange={(e) => {
												settd({
													...td,
													cs: e.target.files ? e.target.files[0] : null,
												});
											}}
											type="file"
											accept=".pdf"
											placeholder="Enter your username"
											className={`w-full rounded-lg border ${
												formik.errors.username
													? "border-red-500 focus:border-red-500"
													: "border-red-500stroke focus:border-red-500blue-500"
											} bg-transparent py-4 pl-6 pr-10 text-black outline-none  focus-visible:shadow-none dark:border-red-500form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500blue-500`}
										/>

										<span className="absolute right-4 top-4">
											<svg
												className="fill-current"
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<g opacity="0.5">
													<path
														d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
														fill=""
													/>
												</g>
											</svg>
										</span>
									</div>
									{formik.errors.username && (
										<p className="text-red-500 text-sm">
											{" "}
											{formik.errors.username}{" "}
										</p>
									)}
								</div>
							)}
							{data.demande_de_stage && (
								<div className="mb-4">
									<label className="mb-2.5 block font-medium text-black dark:text-white">
										Demande de stage
									</label>
									<div className="relative">
										<input
											// {...formik.getFieldProps("ds")}
											onChange={(e) => {
												settd({
													...td,
													ds: e.target.files ? e.target.files[0] : null,
												});
											}}
											type="file"
											accept=".pdf"
											placeholder="Enter your username"
											className={`w-full rounded-lg border ${
												formik.errors.username
													? "border-red-500 focus:border-red-500"
													: "border-red-500stroke focus:border-red-500blue-500"
											} bg-transparent py-4 pl-6 pr-10 text-black outline-none  focus-visible:shadow-none dark:border-red-500form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500blue-500`}
										/>

										<span className="absolute right-4 top-4">
											<svg
												className="fill-current"
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<g opacity="0.5">
													<path
														d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
														fill=""
													/>
												</g>
											</svg>
										</span>
									</div>
									{formik.errors.username && (
										<p className="text-red-500 text-sm">
											{" "}
											{formik.errors.username}{" "}
										</p>
									)}
								</div>
							)}
							{data.lettre_motivation && (
								<div className="mb-4">
									<label className="mb-2.5 block font-medium text-black dark:text-white">
										Lettre de motivation
									</label>
									<div className="relative">
										<input
											// {...formik.getFieldProps("lm")}
											onChange={(e) => {
												settd({
													...td,
													lm: e.target.files ? e.target.files[0] : null,
												});
											}}
											type="file"
											accept=".pdf"
											placeholder="Enter your username"
											className={`w-full rounded-lg border ${
												formik.errors.username
													? "border-red-500 focus:border-red-500"
													: "border-red-500stroke focus:border-red-500blue-500"
											} bg-transparent py-4 pl-6 pr-10 text-black outline-none  focus-visible:shadow-none dark:border-red-500form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500blue-500`}
										/>

										<span className="absolute right-4 top-4">
											<svg
												className="fill-current"
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<g opacity="0.5">
													<path
														d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
														fill=""
													/>
												</g>
											</svg>
										</span>
									</div>
									{formik.errors.username && (
										<p className="text-red-500 text-sm">
											{" "}
											{formik.errors.username}{" "}
										</p>
									)}
								</div>
							)}
						</div>

						<div className="text-center mt-6">
							<Button
								onClick={() => formik.handleSubmit()}
								isLoading={its}
								className=" w-full bg-sky-500 "
								color={"white"}
								colorScheme={"blue"}
								backgroundColor={"darkblue"}>
								Valider
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Postuler;
