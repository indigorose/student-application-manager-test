import type { User } from '../types/user';

export interface Tutor {
	id: number;
	user: User;
	firstName?: string;
	lastName?: string;
	department?: string | null;
}

export type NewTutorRequest = {
	firstName: string;
	lastName: string;
	department: string;
};

export type UpdateStudentRequest = Pick<
	Tutor,
	'firstName' | 'lastName' | 'department'
>;
