/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Header";
import Footer from "./Footer";

const Website = () => {
	return (
		<React.Fragment>
			<Navbar />
			<React.Fragment>
				<Outlet />
			</React.Fragment>
			<div className="mt-32">
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default Website;
