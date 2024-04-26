/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Menu } from "../interfaces/MenuLinks";
import { IMAGES } from "../utils/images";

export default function Navbar(props: any) {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	const isLogin = useAppSelector((state) => state.AuthSlice.isLogin);
	return (
		<nav
			className={
				(props.transparent
					? "top-0 absolute z-50 w-full"
					: "relative bg-white shadow-lg") +
				" flex flex-wrap items-center justify-between px-2 py-3 "
			}>
			<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
				<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
					<Link
						to="/"
						className={
							(props.transparent ? "text-white" : "text-gray-800") +
							" text-sm font-bold leading-relaxed  mr-4 py-2 whitespace-nowrap uppercase flex items-center"
						}>
						<img className="w-14" src={IMAGES.logo} alt="logo" />
						Passerelle Stage
					</Link>
					<button
						className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
						type="button"
						onClick={() => setNavbarOpen(!navbarOpen)}>
						<i
							className={
								(props.transparent ? "text-white" : "text-gray-800") +
								" fas fa-bars"
							}></i>
					</button>
				</div>
				<div
					className={
						"lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
						(navbarOpen ? " block rounded " : " hidden")
					}
					id="example-navbar-warning">
					<ul className="flex flex-col lg:flex-row list-none mr-auto">
						{/* <li className="flex items-center">
							<a
								className={
									(props.transparent
										? "lg:text-white lg:hover:text-gray-300 text-gray-800"
										: "text-gray-800 hover:text-gray-600") +
									" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
								}
								href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/landing">
								<i
									className={
										(props.transparent
											? "lg:text-gray-300 text-gray-500"
											: "text-gray-500") +
										" far fa-file-alt text-lg leading-lg mr-2"
									}
								/>{" "}
								Docs
							</a>
						</li> */}
					</ul>
					<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
						{Menu.map((menu, i) => (
							<li key={i} className="flex items-center">
								<Link
									className={
										(props.transparent
											? "lg:text-white lg:hover:text-gray-300 text-gray-800"
											: "text-gray-800 hover:text-gray-600") +
										" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
									}
									to={menu.path}>
									{/* <i
										className={
											(props.transparent
												? "lg:text-gray-300 text-gray-500"
												: "text-gray-500") +
											" fab fa-twitter text-lg leading-lg "
										}
									/> */}
									<span className=" inline-block ml-2">{menu.text}</span>
								</Link>
							</li>
						))}

						{!isLogin && (
							<li className="flex items-center">
								<Link to="/login">
									<button
										className={
											(props.transparent
												? "bg-white text-gray-800 active:bg-gray-100"
												: "bg-blue-500 text-white active:bg-blue-600") +
											" text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
										}
										type="button"
										style={{ transition: "all .15s ease" }}>
										<i className="fas fa-arrow-alt-circle-down"></i> Login
									</button>
								</Link>
							</li>
						)}
						{isLogin && (
							<li className="flex items-center">
								<Link to="profile">
									<button
										className={
											(props.transparent
												? "bg-white text-gray-800 active:bg-gray-100"
												: "bg-blue-500 text-white active:bg-blue-600") +
											" text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
										}
										type="button"
										style={{ transition: "all .15s ease" }}>
										<i className="fas fa-user"></i> Profile
									</button>
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
