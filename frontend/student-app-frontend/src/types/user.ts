// Types from the backend Role enum
export type Role = 'STUDENT' | 'TUTOR' | 'ADMIN' | 'SPONSOR';

export interface User {
	id: number;
	email: string;
	password: string;
	role: Role;
	isActive: boolean;
}

export type NewUser = Omit<User, 'id'>;

export type UpdateUserRequest = Pick<User, 'email' | 'password'>;
