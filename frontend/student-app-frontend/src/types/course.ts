import type { Tutor } from './tutor';

export interface Course {
	id: number;
	tutor: Tutor;
	title: string;
	description: string;
	category: string;
	capacity: number;
	startDate: string; //format: yyyy-mm-dd
}

export interface NewCourseRequest {
	tutorUserId: number;
	title: string;
	description: string;
	category: string;
	capacity: number;
	startDate: string; //format: yyyy-mm-dd
}
