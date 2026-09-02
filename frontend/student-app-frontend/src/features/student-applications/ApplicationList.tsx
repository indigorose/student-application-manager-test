// List of applications for the Admin

import useApi from '../../hooks/useApi';
import { api } from '../../api/studentApplicationApi';
import type { StudentApplication } from '../../types/studentApplication';

function ApplicationList() {
	const { state } = useApi<StudentApplication[]>(() =>
		api.getAllApplications(),
	);

	if (state.status === 'idle' || state.status == 'loading') {
		return <p>Loading courses</p>;
	}
	if (state.status === 'error') {
		return <p className="error">{state.error.message}</p>;
	}
	return (
		<ul>
			{state.data.map((studentApplication) => (
				<li key={studentApplication.id}>
					Course: {studentApplication.course.title} - Category:{' '}
					{studentApplication.course.category} - Status:{' '}
					{studentApplication.status}
					Course Capacity: {studentApplication.course.capacity} -
					Start Date: {studentApplication.course.startDate}
				</li>
			))}
		</ul>
	);
}

export default ApplicationList;
