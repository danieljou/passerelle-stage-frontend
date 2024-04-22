/** @format */

export interface Errors {
	non_field_errors: string[];
}

export interface LoginOrPassword {
	errors: Errors;
}

export interface RootLoginError {
	data: Data;
	status: number;
}

export interface Data {
	errors?: Errors | null;
}

export interface LoginSuccess {
	token: Token;
	msg: string;
}

export interface Token {
	refresh: string;
	access: string;
	user: UserInformations;
}

export interface UserInformations {
	id: number;
	last_login: string;
	is_superuser: boolean;
	username: string;
	is_staff: boolean;
	is_active: boolean;
	date_joined: string;
	is_cc: boolean;
	last_name: string;
	first_name: string;
	email: string;
	groups: any[];
	user_permissions: any[];
}
