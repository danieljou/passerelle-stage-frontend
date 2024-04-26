/** @format */

export interface LoginInformations {
	username: string;
	password: string;
}

export interface UserSateAndAuthResponse {
	token: Token;
	msg: string;
}

export interface Token {
	refresh: string;
	access: string;
	user: User;
}

export interface User {
	id: string;
	last_login: string;
	is_superuser: boolean;
	username: string;
	is_staff: boolean;
	is_active: boolean;
	date_joined: string;
	last_name: string;
	first_name: unknown;
	email: string;
	picture: unknown;
	is_parrain: boolean;
	school_level: unknown;
	enterprise: unknown;
	groups: unknown[];
	user_permissions: unknown[];
}
