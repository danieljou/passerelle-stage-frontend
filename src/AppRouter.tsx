/** @format */

import { Route, Routes, useLocation } from "react-router-dom";

import Stages from "./pages/Stages";
import Enterprises from "./pages/Enterprises";
import EnterpriseDetails from "./pages/EnterpriseDetails";
import Register from "./pages/Register";
import Website from "./components/Website";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { useEffect } from "react";
import Profile from "./pages/Profile";
const AppRouter = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<Routes>
			<Route path="" Component={Website}>
				<Route index Component={Landing} />
				<Route path="login" Component={Login} />
				<Route path="register" Component={Register} />
				<Route path="stages" Component={Stages} />
				<Route path="enterprises" Component={Enterprises} />
				<Route path="enterprises/:id" Component={EnterpriseDetails} />
				<Route path="profile" Component={Profile} />
			</Route>
		</Routes>
	);
};

export default AppRouter;
