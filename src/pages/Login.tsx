/** @format */

import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { LoginSuccess, RootLoginError } from "../interfaces/loginInterfaces";
import { initialState, loginSuccess } from "../store/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../store/api/AuthenticationApi";

import { useFormik } from "formik";

import * as yup from "yup";
import toast from "react-hot-toast";

export default function Login() {
	const isLogin = useAppSelector((state) => state.AuthSlice.isLogin);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLogin === true) {
			navigate("/");
		}
	}, [isLogin, navigate]);

	const dispatch = useAppDispatch();
	// const searchParams = new URLSearchParams(location.search);
	// const next = searchParams.get("next") || "";

	const [passswordHide, setPasswordHide] = useState<boolean>(true);

	const [Login, { isLoading }] = useLoginUserMutation();

	const validationSchema = yup.object().shape({
		username: yup.string().required("Le nom d'utilisateur est requis"),
		password: yup.string().required("Le mot de passe est requis"),
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => handleSubmit(values),
	});
	const handleSubmit = async (values: {
		username: string;
		password: string;
	}) => {
		const res = await Login(values);
		console.log("RESPONSE ", res);

		if ("data" in res) {
			// toast.success("Successfully logged");
			console.log("SUCESS");
			const sucessData = res?.data as LoginSuccess;
			console.log(sucessData.token.user.email);
			const payload: initialState = {
				access: sucessData.token.access,
				isError: false,
				isLogin: true,
				isLoading: false,
				refresh: sucessData.token.refresh,
				user_infos: sucessData.token.user,
			};
			// dispacth(setLoginTrue());
			console.log("DISPATCH");
			localStorage.setItem("WD_USER", JSON.stringify(payload));
			dispatch(loginSuccess(payload));

			navigate("/");
			// await storeToken(payload);
		} else {
			const ErrorData = res?.error as RootLoginError;
			if (ErrorData.status === 401) {
				console.log(ErrorData);
				toast.error("Login ou mot de passe incorrect");
				// toast.show("Login ou mot de passe incorrect", { type: "error" });
			}

			return; // Retour anticipé en cas d'erreur
		}
	};

	return (
		<>
			{/* <Navbar transparent /> */}
			{/* <ProductCard /> */}
			<main>
				<section className="my-10">
					<div
						className=" w-full h-full "
						style={{
							// backgroundImage:
							// 	"url(" + require("assets/img/register_bg_2.png").default + ")",
							backgroundSize: "100%",
							// background: "red",
							backgroundRepeat: "no-repeat",
						}}></div>
					<div className="container mx-auto px-4 h-full">
						<div className="flex content-center items-center justify-center h-full">
							<div className="w-full lg:w-4/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-red-5000">
									<div className="rounded-t mb-0 px-6 py-6">
										<div className="text-center mb-3">
											<h6 className="text-gray-600 text-sm font-bold">
												Se connecter
											</h6>
										</div>
										<div className="btn-wrapper text-center"></div>
										<hr className="mt-6 border-red-500b-1 border-red-500gray-400" />
									</div>
									<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
										{/* <div className="text-gray-500 text-center mb-3 font-bold">
											<small>Or sign in with credentials</small>
										</div> */}

										<form onSubmit={() => formik.handleSubmit()}>
											<div className="mb-4">
												<label className="mb-2.5 block font-medium text-black dark:text-white">
													Username
												</label>
												<div className="relative">
													<input
														{...formik.getFieldProps("username")}
														type="text"
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

											<div className="mb-6">
												<label className="mb-2.5 block font-medium text-black dark:text-white">
													Password
												</label>
												<div className="relative">
													<input
														{...formik.getFieldProps("password")}
														type={passswordHide ? "password" : "text"}
														name="password"
														placeholder="6+ Characters, 1 Capital letter"
														className={`w-full rounded-lg border ${
															formik.errors.password
																? "border-red-500"
																: "border-red-500stroke"
														} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-red-500blue-500 focus-visible:shadow-none dark:border-red-500form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500blue-500`}
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
																	d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
																	fill=""
																/>
																<path
																	d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
																	fill=""
																/>
															</g>
														</svg>
													</span>
												</div>
												{formik.errors.password && (
													<p className="text-red-500 text-sm">
														{formik.errors.password}
													</p>
												)}
											</div>
											<div className="mb-4">
												<label
													htmlFor="checkboxLabelOne"
													className="flex cursor-pointer select-none items-center">
													<div className="relative">
														<input
															type="checkbox"
															id="checkboxLabelOne"
															className="sr-only"
															onChange={() => {
																setPasswordHide(!passswordHide);
															}}
														/>
														<div
															className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
																passswordHide &&
																"border-red-500blue-500 bg-gray dark:bg-transparent"
															}`}>
															<span
																className={`h-2.5 w-2.5 rounded-sm ${
																	passswordHide && "bg-blue-500"
																}`}></span>
														</div>
													</div>
													Voir le mot de passe
												</label>
											</div>

											<div className="text-center mt-6">
												<Button
													onClick={() => formik.handleSubmit()}
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
								</div>
								<div className="flex flex-wrap mt-6">
									<div className="w-1/2">
										<Link to="" className="text-black">
											<small>Forgot password?</small>
										</Link>
									</div>
									<div className="w-1/2 text-right">
										<Link to="/register" className="text-black">
											<small>Créer un compte</small>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <Footer /> */}
				</section>
			</main>
		</>
	);
}
