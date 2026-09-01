import { baseUrl, ensureOk, fetchJson } from './client';
import type { Course, NewCourseRequest } from '../types/course';

const BASE_URL = baseUrl('/courses');

export interface Api {
	getAllCourses(): Promise<Course[]>;
	getCourseById(id: number): Promise<Course | undefined>;
	addCourse(input: NewCourseRequest): Promise<Course>;
	getCourseByTutorId(id: number): Promise<Course[]>;
}

const courseApi: Api = {
	// List all the courses
	async getAllCourses() {
		return fetchJson<Course[]>(BASE_URL, 'list all the courses');
	},
	// Get a course by course id
	async getCourseById(id: number) {
		const response = await fetch(`${BASE_URL}/${id}`);
		if (response.status === 404) {
			return undefined;
		}
		ensureOk(response, `get course ${id}`);
		return (await response.json()) as Course;
	},
	// Add a course
	async addCourse(input: NewCourseRequest) {
		return fetchJson<Course>(`${BASE_URL}`, `add course: ${input.title}`, {
			method: 'POST',
			body: JSON.stringify(input),
		});
	},
	// Get courses by Tutor Id
	async getCourseByTutorId(id: number) {
		return fetchJson<Course[]>(
			`${BASE_URL}?tutorUserId=${id}`,
			"list all the tutor's courses.",
		);
	},
};

export const api: Api = courseApi;
