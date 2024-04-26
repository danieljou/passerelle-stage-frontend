/** @format */

import {
	Badge,
	Box,
	IconButton,
	Input,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";
import {
	useGetInternshipsQuery,
	// useGetSearchParametersQuery,
} from "../store/api/MainApi";
import { useEffect, useState } from "react";

import { InternshipArray } from "../interfaces/Internship";
import SingleInternship from "./SingleInternship";
import { Link } from "react-router-dom";

const Search = () => {
	// const {} = useGetSearchParametersQuery();
	const {
		data: internships,
		isSuccess: internshipsSuccess,
		isLoading: internshipsLoading,
	} = useGetInternshipsQuery();
	const [filteredData, setFilteredData] = useState<InternshipArray>([]);
	const [selected, setSelected] = useState<number | null>(null);

	const handleSearchByTown = (val: string) => {
		const f = internships?.filter((e) =>
			e.enterprise.town.toLowerCase().includes(val.toLowerCase())
		);
		console.log(f);
		setFilteredData(f ? f : filteredData);
	};
	const handleSearchByType = (val: string) => {
		const f = internships?.filter((e) =>
			e.type.toLowerCase().includes(val.toLowerCase())
		);
		console.log(f);
		setFilteredData(f ? f : filteredData);
	};
	const handleSearchByEnterprise = (val: string) => {
		const f = internships?.filter((e) =>
			e.enterprise.name.toLowerCase().includes(val.toLowerCase())
		);
		console.log(f);
		setFilteredData(f ? f : filteredData);
	};
	useEffect(() => {
		if (internships) setFilteredData(internships);
		if (internships != null && internships.length > 0) setSelected(0);
	}, [internships]);
	return (
		<div className="p-8">
			<p className="font-bold text-xl my-4">Recherchez une stage</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
				<Input
					onChange={(e) => handleSearchByTown(e.target.value)}
					placeholder="Chercher par ville"
				/>
				<Input
					onChange={(e) => handleSearchByType(e.target.value)}
					placeholder="Chercher par type"
				/>
				<Input
					onChange={(e) => handleSearchByEnterprise(e.target.value)}
					placeholder="Chercher par entreprise"
				/>
				<div className="flex gap-4">
					<Input />
					<Input />
					<IconButton aria-label={"zdz"} />
				</div>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2 col-span-1 h-screen overflow-y-auto">
					{internshipsLoading && (
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-4 gap-4">
							{Array.from({ length: 4 }).map(() => (
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
					{internshipsSuccess && (
						<div className="grid grid-cols-1 lg:grid-cols-2  gap-4 my-4">
							{filteredData.map((internship, index) => (
								<div
									onClick={() => setSelected(index)}
									className="h-full"
									key={index}>
									<SingleInternship desable data={internship} />
								</div>
							))}
						</div>
					)}
				</div>
				<div className="col-span-1">
					{internshipsLoading && (
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
					)}

					{internshipsSuccess && selected != null && (
						<div className=" my-4 p-4 bg-white shadow-xl rounded-lg">
							{filteredData[selected] && (
								<div className="w-full">
									<p className="font-bold text-xl">
										{filteredData[selected].enterprise.name}
									</p>
									<img
										alt="logo"
										src={filteredData[selected].enterprise.logo}
									/>
									<p className="font-semibold my-4">
										Stage {filteredData[selected].type}
									</p>
									<p className="text-gray-500 text-justify w-full ">
										{filteredData[selected].enterprise.description}
									</p>
									<div className="flex justify-between my-4 font-bold text-gray-600">
										<span>{filteredData[selected].start_date}</span>
										<span>{filteredData[selected].end_date}</span>
									</div>
									<p className="font-bold">Modalités</p>
									<p className="text-justify">
										{filteredData[selected].modalities}
									</p>
									<p className="font-bold mt-4">Localisation</p>
									<div className="flex justify-between mb-4 font-bold text-gray-600">
										<span>{filteredData[selected].enterprise.town}</span>
										<span>
											{filteredData[selected].enterprise.localisation}
										</span>
									</div>
									<div className="mt-1">
										<div className="font-bold">
											{filteredData[selected].price === 0 ? (
												<Badge color={"red"}>
													<div className="text-2xl">Gratuit</div>
												</Badge>
											) : (
												<Badge color={"red"}>
													<div className="text-2xl">
														{filteredData[selected].price} XFA
													</div>
												</Badge>
											)}
										</div>
									</div>

									<Link to={""}>
										{" "}
										<div className="w-full my-4 text-center bg-blue-500 py-2 font-bold text-lg text-white rounded-full">
											Postler
										</div>
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
