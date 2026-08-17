export interface User {
	id: string;
	email: string;
	password: string;
	role: string;
	isActive: boolean;
}

export interface Api {
	listUsers(): Promise<User[]>;
	getUser(id: string): Promise<User | undefined>;
	addUser(input: Omit<User, 'id'>): Promise<User>;
	updateUser(id: string, patch: Partial<Omit<User, 'id'>>): Promise<User>;
	removeUser(id: string): Promise<void>;
}

// const USE_MOCK = false;

const BASE_URL = 'http://localhost:8080/api';

function ensureOk(response: Response, doing: string): void {
	if (!response.ok) {
		throw new Error(
			`Failed to ${doing}: the server responded with ` +
				`${response.status} ${response.statusText}. ` +
				`Is the API server running? Start it with: npm run api`,
		);
	}
}

const httpApi: Api = {
	async listUsers() {
		const response = await fetch(`${BASE_URL}/users`);
		ensureOk(response, 'list the destinations');
		return (await response.json()) as User[];
	},
	async getUser(id) {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (response.status === 404) {
			return undefined;
		}
		ensureOk(response, `get user ${id}`);
		return (await response.json()) as User;
	},
	async addUser(input) {
		const user: User = {
			id: crypto.randomUUID(),
			...input,
		};
		const response = await fetch(`${BASE_URL}/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});
		ensureOk(response, `add user ${input.email}`);
		return (await response.json()) as User;
	},
	async updateUser(id, patch) {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(patch),
		});
		ensureOk(response, `update user ${id}`);
		return (await response.json()) as User;
	},

	async removeUser(id) {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
		});
		ensureOk(response, `remove user ${id}`);
	},
};

export const api: Api = httpApi;
