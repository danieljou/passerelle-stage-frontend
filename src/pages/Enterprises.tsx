/** @format */

import {
	Alert,
	AlertIcon,
	Box,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";
import { useGetEnterprisesQuery } from "../store/api/MainApi";
import SingleEnterprise from "../components/SingleEnterprise";

const Enterprises = () => {
	const { isLoading, isSuccess, data, isError } = useGetEnterprisesQuery();
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
				<div className="p-4 my-5">
					<p className="text-3xl font-bold">Liste de entreprises</p>
					<p className="text-gray-500 my-5">Selectionnez une pour continuer</p>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
						{data.map((enterprise, index) => (
							<div key={index}>
								<SingleEnterprise data={enterprise} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Enterprises;
