// Access the student API back end

import type { Student, NewStudentRequest } from '../types/student';
import { baseUrl, ensureOk, fetchJson } from './client';

const BASE_URL = baseUrl('/students');

export interface Api {
	getAllStudents(): Promise<Student[]>;
	getStudentById(id: number): Promise<Student | undefined>;
	addStudent(id: number, input: NewStudentRequest): Promise<Student>;
	// updateStudentProfile(
	// 	id: number,
	// 	patch: UpdateStudentRequest,
	// ): Promise<Student>;
}

const studentApi: Api = {
	// List all the students
	async getAllStudents() {
		return fetchJson<Student[]>(BASE_URL, 'list all the students');
	},
	// Get Student by Id
	async getStudentById(id: number) {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (response.status == 404) {
			return undefined;
		}
		ensureOk(response, `get student ${id}`);
		return (await response.json()) as Student;
	},
	// Add a student
	async addStudent(id: number, input: NewStudentRequest) {
		return fetchJson<Student>(
			`${BASE_URL}/${id}`,
			`add student profile: ${input.firstName} ${input.lastName}`,
			{
				method: 'POST',
				body: JSON.stringify(input),
			},
		);
	},
	// Update student profile
	// async updateStudentProfile(id: number, patch: UpdateStudentRequest){
	//     return fetchJson<Student>(BASE_URL, `update student profile: ${id}`), {
	//         method: 'PUT',
	//         body: JSON.stringify(patch),
	//     }
	// }
};

export const api: Api = studentApi;
