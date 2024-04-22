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
}
export interface InternshipForm extends Omit<Internship, "id"> {}
