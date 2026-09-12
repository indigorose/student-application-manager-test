// Access the tutor API backend
import type { Tutor, NewTutorRequest } from '../types/tutor';
import { baseUrl, ensureOk, fetchJson } from './client';

const BASE_URL = baseUrl('/tutors');

export interface Api {
	getAllTutors(): Promise<Tutor[]>;
	getTutorById(id: number): Promise<Tutor | undefined>;
	addTutor(id: number, input: NewTutorRequest): Promise<Tutor>;
	updateTutor(userId: number, request: NewTutorRequest): Promise<Tutor>;
}

const tutorApi: Api = {
	//List all the tutors
	async getAllTutors() {
		return fetchJson<Tutor[]>(BASE_URL, 'list all the tutors');
	},
	// Get a tutor by ID
	async getTutorById(id: number) {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (response.status === 404) {
			return undefined;
		}
		ensureOk(response, `get tutor ${id}`);
		return (await response.json()) as Tutor;
	},
	// Add a tutor
	async addTutor(id: number, input: NewTutorRequest) {
		return fetchJson<Tutor>(
			`${BASE_URL}/${id}`,
			`add tutor profile: ${input.firstName} ${input.lastName}`,
			{
				method: 'POST',
				body: JSON.stringify(input),
			},
		);
	},
	// Update a tutor
	async updateTutor(userId: number, request: NewTutorRequest) {
		return fetchJson<Tutor>(
			`${BASE_URL}/${userId}`,
			`update tutor ${userId}`,
			{
				method: 'PUT',
				body: JSON.stringify(request),
			},
		);
	},
};

export const tutorsApi: Api = tutorApi;
