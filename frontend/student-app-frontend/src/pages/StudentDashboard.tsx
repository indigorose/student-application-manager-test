import useApi from '../hooks/useApi';
import StudentProfileForm from '../features/students/StudentProfileForm';
import { api } from '../api/studentApi';
import StudentProfileView from '../components/StudentProfileView';

interface Props {
	userId: number;
}

function StudentDashboard({ userId }: Props) {
	const { state: studentState, refreshData: reloadStudent } = useApi(
		() => api.getStudentById(userId),
		[userId],
	);

	if (studentState.status === 'loading' || studentState.status === 'idle') {
		return <p>Loading...</p>;
	}

	if (studentState.status === 'error') {
		return <p className="error">{studentState.error.message}</p>;
	}
	if (studentState.data === undefined) {
		return <StudentProfileForm userId={userId} onCreated={reloadStudent} />;
	}

	return (
		<StudentProfileView
			student={studentState.data}
			onUpdated={reloadStudent}
		/>
	);
}

export default StudentDashboard;
