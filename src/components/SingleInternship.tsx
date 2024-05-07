/** @format */

import { Link } from "react-router-dom";
import { Internship } from "../interfaces/Internship";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogOverlay,
	Badge,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import StageDetails from "./StageDetails";
import { useRef } from "react";

const SingleInternship = ({
	data,
	desable,
}: {
	data: Internship;
	desable: boolean;
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement | null>(null);
	return (
		<div className="overflow-hidden shadow-lg rounded-md h-full">
			<Link
				onClick={(e) => {
					if (desable) e.preventDefault();
				}}
				to={`/internship/${data.id}`}
				className="bg-red-500  ">
				<div className="p-6">
					<div className="mt-1">
						<img src={data.enterprise.logo} alt="logo" className="w-16" />
					</div>
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
				<div className="lg:hidden p-4 ">
					<button
						onClick={() => onOpen()}
						className="bg-blue-500 rounded-lg py-2  px-7 flex justify-center text-white font-bold text-xl">
						Voir
					</button>
				</div>
				<AlertDialog
					isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}>
					<AlertDialogOverlay>
						<AlertDialogContent padding={41} className="w-[800px]">
							<StageDetails stage={data} />

							<AlertDialogFooter>
								<Button
									ref={cancelRef}
									colorScheme="red"
									onClick={onClose}
									ml={3}>
									Fermer
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</Link>
		</div>
	);
};

export default SingleInternship;
