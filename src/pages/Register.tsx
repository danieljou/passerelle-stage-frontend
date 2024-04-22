/** @format */

import { motion } from "framer-motion";
import React, { useState } from "react";
// import { GiReceiveMoney } from "react-icons/gi";
// import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addErrorClasses, addErrorMessage } from "../utils/addErrorClasses.tsx";

import toast from "react-hot-toast";
import { useRegisterMutation } from "../store/api/AuthenticationApi.ts";
import { Button } from "@chakra-ui/react";

const Register: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [registerUser] = useRegisterMutation();
	const [custumErrors, setCustumErrors] = useState<{ [key: string]: string }>(
		{}
	);
	const navigate = useNavigate();

	const HandleSubmit = async (values: {
		last_name: string;
		username: string;
		email: string;
		password: string;
		password2: string;
	}) => {
		setIsLoading(true);
		const res = await registerUser({ data: values });
		setCustumErrors({});

		if (res) {
			setIsLoading(false);
			if ("error" in res) {
				const errors = res.error;
				if ("data" in errors) {
					const data = errors.data as Object;
					if ("username" in data)
						toast.error("Un utilisateur possède déjà ce nom d'utilisateur");
					setCustumErrors({
						...custumErrors,
						username: "Un utilisateur possède déjà ce nom d'utilisateur",
					});
					if ("data" in data) {
						toast.error("Un utilisateur possède déjà cet email");
						setCustumErrors({
							...custumErrors,
							email: "Un utilisateur possède déjà cet email",
						});
					}
				}
			} else if ("data" in res) {
				toast.success("Création de compte effectuée avec succès");
				navigate("/login");
			}
		}
	};

	const styles =
		"w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg";

	const formMik = useFormik({
		initialValues: {
			last_name: "",
			username: "",
			email: "",
			password: "",
			password2: "",
		},
		validationSchema: Yup.object({
			last_name: Yup.string().required("Le nom est requis"),
			username: Yup.string().required("Le nom d'utilisateur est requis"),
			email: Yup.string()
				.required("L'email est requise")
				.email("Ceci n'est pas une email valide"),
			password: Yup.string().required("Entrez le mot de passe"),
			password2: Yup.string()
				.required("Entrez la confirmation")
				.required("Confirmez le mot de passe"),
		}),
		onSubmit: (values) => HandleSubmit(values),
	});

	return (
		<div className="relative h-screen">
			<main className="w-full flex">
				<div className="relative flex-1 hidden items-center justify-center h-screen bg-indigo-600 lg:flex">
					<Link
						to="/"
						className="absolute z-10 -right-5 top-[50%] bg-gradient-to-tr from-sky-500 to-indigo-500 p-2 rounded-full shadow-lg"></Link>
					<div className="relative z-10 w-full max-w-md">
						<div className=" mt-16 space-y-3">
							<h3 className="text-white text-3xl font-bold">
								Commencez dès maintenant
							</h3>
							<p className="text-gray-300">
								Créez votre compte ou celui de votre institution afin de
								continuer
							</p>
							<div className="flex items-center -space-x-2 overflow-hidden">
								{/* Add your images here */}
								<p className="text-sm text-gray-400 font-medium translate-x-5">
									Join 5.000+ users
								</p>
							</div>
						</div>
					</div>
					<div
						className="absolute inset-0 my-auto h-[500px]"
						style={{
							background:
								"linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
							filter: "blur(118px)",
						}}></div>
				</div>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1 }}
					className="flex-1 flex items-center justify-center h-screen">
					<div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
						<div className="">
							<div className="mt-5 space-y-2">
								<h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
									S'inscrire
								</h3>
								<p className="">
									Vous avez déjà un compte?{" "}
									<Link
										to="/login"
										className="font-medium text-indigo-600 hover:text-indigo-500">
										Se connecter
									</Link>{" "}
								</p>
							</div>
						</div>
						<form onSubmit={formMik.handleSubmit} className="space-y-5">
							<div>
								<label className="font-medium">Nom et prénom</label>
								<input
									{...formMik.getFieldProps("last_name")} // Spread formik field props
									className={`${styles} ${addErrorClasses(
										formMik,
										"last_name"
									)}`} // Apply error classes
									type="text"
								/>
								{addErrorMessage(formMik, "last_name")}{" "}
								{/* Display error message if exists */}
							</div>
							<div>
								<label className="font-medium">Nom d'utilisateur</label>
								<input
									{...formMik.getFieldProps("username")}
									className={`${styles} ${addErrorClasses(
										formMik,
										"username"
									)} ${
										custumErrors.username &&
										"border-red-400 focus:border-red-400"
									}`}
									type="text"
								/>
								{addErrorMessage(formMik, "username")}
								{custumErrors.username && (
									<div className="text-red-500 text-xs">
										{" "}
										{custumErrors.username}{" "}
									</div>
								)}
							</div>
							<div>
								<label className="font-medium">Email</label>
								<input
									type="email"
									className={`${styles} ${addErrorClasses(formMik, "email")} ${
										custumErrors.email && "border-red-400 focus:border-red-400"
									}`}
									{...formMik.getFieldProps("email")}
								/>
								{addErrorMessage(formMik, "email")}
								{custumErrors.email && (
									<div className="text-red-500 text-xs">
										{" "}
										{custumErrors.email}{" "}
									</div>
								)}
							</div>
							<div>
								<label className="font-medium">Mot de passe</label>
								<input
									type="password"
									{...formMik.getFieldProps("password")}
									className={`${styles} ${addErrorClasses(
										formMik,
										"password"
									)}`}
								/>
								{addErrorMessage(formMik, "password")}
							</div>
							<div>
								<label className="font-medium">
									Confirmation du mot de passe
								</label>
								<input
									type="password"
									{...formMik.getFieldProps("password2")}
									className={`${styles} ${addErrorClasses(
										formMik,
										"password2"
									)}`}
								/>
								{addErrorMessage(formMik, "password2")}
							</div>
							<div className="text-center mt-6">
								<Button
									onClick={() => formMik.handleSubmit()}
									isLoading={isLoading}
									className=" w-full bg-sky-500 "
									color={"white"}
									colorScheme={"blue"}
									backgroundColor={"darkblue"}>
									Valider
								</Button>
							</div>
						</form>
					</div>
				</motion.div>
			</main>
		</div>
	);
};

export default Register;
