/** @format */

import { Enterprise } from "./Enterprises";

export type InternshipArray = Internship[];

export interface Internship {
	id: string;
	enterprise: Enterprise;
	modalities: string;
	price: number;
	total_place: number;
	start_date: string;
	end_date: string;
	place: string;
	type: string;
	cv: boolean;
	lettre_motivation: boolean;
	certificat_scolarite: boolean;
	demande_de_stage: boolean;
}
export interface InternshipForm extends Omit<Internship, "id"> {}

export interface demandeDoc {
	title: string;
	file: File | null;
}
export interface InternshipCreate {
	demand: { intermship: string; owner: string };
	docs: demandeDoc[];
}
