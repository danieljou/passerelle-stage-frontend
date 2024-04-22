/** @format */

import { Link } from "react-router-dom";
import { Internship } from "../interfaces/Internship";
import { Badge } from "@chakra-ui/react";

const SingleInternship = ({ data }: { data: Internship }) => {
	return (
		<div className="overflow-hidden shadow-lg border-slate-700 border-2">
			<Link to={`/internship/${data.id}`} className="bg-red-500  ">
				<div className="p-6">
					<div className="mt-1">
						<div className="text-gray-600 text-sm">Type</div>
						<div className="font-bold"> {data.type}</div>
					</div>
					<div className="mt-1">
						<div className="text-gray-600 text-sm">Prix</div>
						<div className="font-bold">
							{data.price === 0 ? (
								<Badge color={"green"}>Gratuit</Badge>
							) : (
								<Badge className="text-2xl" color={"green"}>
									{data.price} XFA
								</Badge>
							)}
						</div>
					</div>
				</div>
				<div className="flex justify-between p-6 text-gray-600">
					<span>{data.start_date}</span>
					<span>{data.end_date}</span>
				</div>
			</Link>
		</div>
	);
};

export default SingleInternship;
