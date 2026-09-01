// List the courses view only for the tutor
import useApi from '../../hooks/useApi';
import { api } from '../../api/coursesApi';
import type { Course } from '../../types/course';

function CourseList() {
	const { state } = useApi<Course[]>(() => api.getAllCourses());

	if (state.status === 'idle' || state.status == 'loading') {
		return <p>Loading courses</p>;
	}
	if (state.status === 'error') {
		return <p className="error">{state.error.message}</p>;
	}
	return (
		<ul>
			{state.data.map((course) => (
				<li key={course.id}>
					Course: {course.title} - Category: {course.category} -
					Description: {course.description} - Capacity:{' '}
					{course.capacity} - Start Date: {course.startDate}
				</li>
			))}
		</ul>
	);
}

export default CourseList;
