/** @format */

import { useParams } from "react-router-dom";
import { useGetSingleEnterpriseQuery } from "../store/api/MainApi";
import {
	Alert,
	AlertIcon,
	Box,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";

import SingleInternship from "../components/SingleInternship";

const EnterpriseDetails = () => {
	const { id } = useParams();
	const { data, isError, isLoading, isSuccess } = useGetSingleEnterpriseQuery(
		id as string
	);
	return (
		<div>
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 gap-4">
					{Array.from({ length: 8 }).map(() => (
						<div className="w-full h-72">
							<Box padding="6">
								<SkeletonCircle size="10" />
								<SkeletonText
									mt="4"
									noOfLines={6}
									spacing="4"
									skeletonHeight="2"
								/>
							</Box>
						</div>
					))}
				</div>
			)}
			{isError && (
				<div className="p-4">
					<Alert status="error">
						<AlertIcon />
						Une erreur est survenue
					</Alert>
				</div>
			)}
			{isSuccess && (
				<div className="p-8 my-5">
					<p className="text-3xl font-bold">Détails sur l'enterprise</p>
					<div className="">
						<div className="">
							{/* <div className="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div> */}
							<img
								className="h-48 w-full object-contain object-end"
								src={`${data.enterprise.logo}`}
								alt={data.enterprise.name}
							/>
							<div className="">
								<h4 className="mt-2 font-bold text-2xl leading-tight truncate">
									{data.enterprise.name}
								</h4>

								<div className="mt-1">
									<span>{data.enterprise.description}</span>
								</div>
								<div className="mt-1 font-bold">
									<span>{data.enterprise.email}</span>
								</div>
							</div>
						</div>
					</div>
					<p className="text-3xl font-bold my-4">
						Liste de stages de l'entreprise
					</p>
					<p className="text-gray-500 my-5">Selectionnez un pour continuer</p>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
						{data.internships.map((internship, index) => (
							<div key={index}>
								<SingleInternship data={internship} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default EnterpriseDetails;
