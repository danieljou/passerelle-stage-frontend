/** @format */

import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
	children: ReactNode;
}
const IsAuthenticated: React.FC<Props> = ({ children }) => {
	// const user = useAppSelector((state) => state.AuthSlice.isLogin);
	// alert(user);
	// console.log(user);
	const user = localStorage.getItem("WD_USER");
	// console.log("user", user);

	return <div>{user ? children : <Navigate to={"/login"} />}</div>;
};

export default IsAuthenticated;
