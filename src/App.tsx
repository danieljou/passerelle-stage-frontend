/** @format */

import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import {
	initialState,
	loginSuccess,
	setLoginTrue,
} from "./store/slices/AuthSlice";
import AppRouter from "./AppRouter";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const user = localStorage.getItem("WD_USER");
		console.log("user", user);

		if (user) {
			const data = JSON.parse(user) as initialState;
			dispatch(loginSuccess(data));
			dispatch(setLoginTrue());
		}
	}, []);

	return (
		<ChakraProvider>
			<Toaster />
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
