import type { User, Role, NewUser, UpdateUserRequest } from '../types/user';
import { baseUrl, ensureOk, fetchJson } from './client';
// export interface User {
// 	id: number;
// 	email: string;
// 	password: string;
// 	role: string;
// 	isActive: boolean;
// }

// function ensureOk(response: Response, doing: string): void {
// 	if (!response.ok) {
// 		throw new Error(
// 			`Failed to ${doing}: the server responded with ` +
// 				`${response.status} ${response.statusText}. ` +
// 				`Check the docker and Spring Boot connections.`,
// 		);
// 	}
// }
const BASE_URL = baseUrl('/users');

export interface Api {
	getAllUsers(): Promise<User[]>;
	getUsersByRole(role: Role): Promise<User[] | undefined>;
	getUser(id: number): Promise<User | undefined>;
	getUserByEmail(email: string): Promise<User | undefined>;
	addUser(input: Omit<User, 'id'>): Promise<User>;
	updateUser(id: number, patch: Partial<Omit<User, 'id'>>): Promise<User>;
	removeUser(id: number): Promise<void>;
}

const usersApi: Api = {
	// List all the users
	async getAllUsers() {
		return fetchJson<User[]>(BASE_URL, 'list all the users');
	},
	// List users by role
	async getUsersByRole(role: Role) {
		return fetchJson<User[]>(
			`${BASE_URL}?role=${role}`,
			'list the users by role',
		);
	},
	// Get user by ID
	async getUser(id: number) {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (response.status === 404) {
			return undefined;
		}
		ensureOk(response, `get user ${id}`);
		return (await response.json()) as User;
	},
	// Get user by email
	async getUserByEmail(email: string) {
		const response = await fetch(
			`${BASE_URL}?email=${encodeURIComponent(email)}`,
		);
		if (response.status === 404) {
			return undefined;
		}
		ensureOk(response, `get user ny email: ${email}`);
		return (await response.json()) as User;
	},
	async addUser(input: NewUser) {
		return fetchJson<User>(BASE_URL, `add user: ${input.email}`, {
			method: 'POST',
			body: JSON.stringify(input),
		});
	},
	async updateUser(id: number, patch: UpdateUserRequest) {
		return fetchJson<User>(BASE_URL, `update user: ${id}`, {
			method: 'PUT',
			body: JSON.stringify(patch),
		});
	},

	async removeUser(id: number) {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
		});
		ensureOk(response, `remove user ${id}`);
	},
};

export const api: Api = usersApi;
