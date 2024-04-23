/** @format */

import { Link } from "react-router-dom";
import { Enterprise } from "../interfaces/Enterprises";

const SingleEnterprise = ({ data }: { data: Enterprise }) => {
	return (
		<div className="overflow-hidden shadow-sm ">
			<Link to={`${data.id}`} className="bg-red-500  ">
				{/* <div className="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div> */}
				<img
					className="h-48 w-full object-contain object-end"
					src={`${data.logo}`}
					alt={data.name}
				/>
				<div className="p-6">
					<h4 className="mt-2 font-semibold text-lg leading-tight truncate">
						{data.name}
					</h4>

					<div className="mt-1">
						<span>{data.description.slice(0, 200)}</span>
						<span className="text-gray-600 text-sm">....</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default SingleEnterprise;
