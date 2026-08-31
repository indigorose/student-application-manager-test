import type { User } from '../types/user';

export interface Student {
	id: number;
	user: User;
	firstName: string;
	lastName: string;
	dob: string | null;
	phone: string | null;
	address: string | null;
}

export type NewStudentRequest = {
	firstName: string;
	lastName: string;
	dob: string;
	phone: string;
	address: string;
};

export type UpdateStudentRequest = Pick<
	Student,
	'firstName' | 'lastName' | 'dob' | 'phone' | 'address'
>;
