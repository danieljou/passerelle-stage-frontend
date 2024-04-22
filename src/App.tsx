/** @format */

import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Website from "./components/Website";

import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import {
	initialState,
	loginSuccess,
	setLoginTrue,
} from "./store/slices/AuthSlice";
import Stages from "./pages/Stages";
import Enterprises from "./pages/Enterprises";
import EnterpriseDetails from "./pages/EnterpriseDetails";
import Register from "./pages/Register";

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
				<Routes>
					<Route path="" Component={Website}>
						<Route index Component={Landing} />
						<Route path="login" Component={Login} />
						<Route path="register" Component={Register} />
						<Route path="stages" Component={Stages} />
						<Route path="enterprises" Component={Enterprises} />
						<Route path="enterprises/:id" Component={EnterpriseDetails} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
