/** @format */

export type EnterpriseArray = Enterprise[];

export interface Enterprise {
	id: string;
	email: string;
	name: string;
	description: string;
	logo: string;
	place_coordinates: string;
}
export interface EnterpriseForm extends Omit<Enterprise, "id"> {}
