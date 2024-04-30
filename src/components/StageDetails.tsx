/** @format */

import { Internship } from "../interfaces/Internship";
import { Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const StageDetails = ({ stage }: { stage: Internship }) => {
	return (
		<div className="w-full p-7">
			<div className="flex ">
				<div className=" w-1/2">
					<img
						alt="logo"
						src={stage.enterprise.logo}
						className="w-1/2 m-auto"
					/>
					<p className=" my-4 text-center text-xl font-bold">
						Stage {stage.type}
					</p>
				</div>
				<div className=" w-1/2 p-5">
					<p className="font-bold text-2xl ">{stage.enterprise.name}</p>

					<p className="font-bold my-4">
						<i className="fa fa-location"></i> Localisation
					</p>
					<div className="flex justify-between mb-4 font-bold text-gray-600">
						<span>{stage.enterprise.town}</span>
						<span>{stage.enterprise.localisation}</span>
					</div>
					<div className="flex justify-between my-4 font-bold text-gray-600">
						<span>{stage.start_date}</span>
						<span>{stage.end_date}</span>
					</div>
				</div>
			</div>
			<div className="font-bold text-xl my-5 ">Description de l'entreprise</div>
			<p className="text-gray-500 text-justify w-full ">
				{stage.enterprise.description}
			</p>

			<p className="font-bold">Modalités</p>
			<p className="text-justify">{stage.modalities}</p>
			<p>
				{stage.cv && (
					<div className="my-2">
						<i className="fa fa-check-circle"></i> CORRICULIUM VITAE
					</div>
				)}
			</p>
			<p>
				{stage.certificat_scolarite && (
					<div className="my-2">
						<i className="fa fa-check-circle"></i> CERTIFICAT DE SCOLARITE
					</div>
				)}
			</p>
			<p>
				{stage.demande_de_stage && (
					<div className="my-2">
						<i className="fa fa-check-circle"></i> DEMANDE DE STAGE
					</div>
				)}
			</p>
			<p>
				{stage.lettre_motivation && (
					<div className="my-2">
						<i className="fa fa-check-circle"></i> LETTRE DE MOTIVATION
					</div>
				)}
			</p>

			<div className="mt-1">
				<div className="font-bold">
					{stage.price === 0 ? (
						<Badge color={"red"}>
							<div className="text-2xl">Gratuit</div>
						</Badge>
					) : (
						<Badge color={"red"}>
							<div className="text-2xl">{stage.price.toLocaleString()} XFA</div>
						</Badge>
					)}
				</div>
			</div>

			<p className="text-gray-500 text-justify w-full font-bold ">
				Place restante : {stage.place}
			</p>

			<Link to={`/postuler/${stage.id}`}>
				{" "}
				<div className="w-full my-4 text-center bg-blue-500 py-2 font-bold text-lg text-white rounded-full">
					Postler
				</div>
			</Link>
		</div>
	);
};

export default StageDetails;
