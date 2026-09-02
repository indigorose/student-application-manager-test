import type { Student } from './student';
import type { Course } from './course';

export type Status =
	| 'DRAFT'
	| 'SUBMITTED'
	| 'UNDER_REVIEW'
	| 'APPROVED'
	| 'REJECTED';

export interface StudentApplication {
	id: number;
	student: Student;
	course: Course;
	status: Status;
	personalStatement: string;
	submittedAt: string | null;
	reviewedAt: string | null;
}

export interface StudentApplicationRequest {
	studentUserId: number;
	courseId: number;
	personalStatement: string;
}

export interface StatusUpdateRequest {
	status: Status;
}
