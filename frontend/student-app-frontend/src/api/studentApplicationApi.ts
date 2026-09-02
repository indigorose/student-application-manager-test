import { baseUrl, ensureOk, fetchJson } from './client';
import type {
	StudentApplication,
	StudentApplicationRequest,
	StatusUpdateRequest,
} from '../types/studentApplication';

const BASE_URL = baseUrl('/student-applications');

export interface Api {
	getAllApplications(): Promise<StudentApplication[]>;
	getApplicationsByStudent(
		studentUserId: number,
	): Promise<StudentApplication[]>;
	getApplicationsByCourse(courseId: number): Promise<StudentApplication[]>;
	getApplication(applicationId: number): Promise<StudentApplication>;
	submitApplication(
		request: StudentApplicationRequest,
	): Promise<StudentApplication>;
	updateApplicationStatus(
		applicationId: number,
		request: StatusUpdateRequest,
	): Promise<StudentApplication>;
	deleteApplication(applicationId: number): Promise<void>;
}

const studentApplicationApi: Api = {
	//List all the applications
	async getAllApplications() {
		return fetchJson<StudentApplication[]>(BASE_URL, 'list applications');
	},
	async getApplicationsByStudent(studentUserId) {
		return fetchJson<StudentApplication[]>(
			`${BASE_URL}?studentUserId=${studentUserId}`,
			'list applications by Student.',
		);
	},
	async getApplicationsByCourse(courseId) {
		return fetchJson<StudentApplication[]>(
			`${BASE_URL}?courseId=${courseId}`,
			'list applications by course.',
		);
	},
	async getApplication(applicationId) {
		return fetchJson<StudentApplication>(
			`${BASE_URL}/=${applicationId}`,
			'Get application by ID.',
		);
	},
	async submitApplication(request: StudentApplicationRequest) {
		return fetchJson<StudentApplication>(BASE_URL, 'Submit application', {
			method: 'POST',
			body: JSON.stringify(request),
		});
	},
	async updateApplicationStatus(
		applicationId: number,
		request: StatusUpdateRequest,
	) {
		return fetchJson<StudentApplication>(
			`${BASE_URL}/${applicationId}/status`,
			'Submit application',
			{
				method: 'PUT',
				body: JSON.stringify(request),
			},
		);
	},
	async deleteApplication(applicationId) {
		const response = await fetch(`${BASE_URL}/${applicationId}`, {
			method: 'DELETE',
		});
		await ensureOk(response, `Delete application ${applicationId}`);
	},
};

export const api: Api = studentApplicationApi;
