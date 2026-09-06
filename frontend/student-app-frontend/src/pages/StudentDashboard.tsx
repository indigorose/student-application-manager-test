import useApi from '../hooks/useApi';
import StudentProfileForm from '../features/students/StudentProfileForm';
import { studentsApi } from '../api/studentApi';
import StudentProfileView from '../components/StudentProfileView';
import UpdateUserForm from '@/features/users/UpdateUserForm';
import CourseCatalogue from '@/features/courses/CourseCatalogue';
import StudentApplicationsPanel from '@/features/student-applications/StudentApplicationsPanel';
interface Props {
	userId: number;
}

function StudentDashboard({ userId }: Props) {
	const { state: studentState, refreshData: reloadStudent } = useApi(
		() => studentsApi.getStudentById(userId),
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

	const student = studentState.data;

	return (
		<div>
			<h2>
				{student.firstName} {student.lastName}'s Dashboard
			</h2>
			<div>
				<h3>Update the account</h3>
				<UpdateUserForm user={student.user} onUpdated={reloadStudent} />
			</div>
			<div>
				<h3>Profile</h3>
				<StudentProfileView
					student={student}
					onUpdated={reloadStudent}
				/>
			</div>
			<div>
				<h3>Browse Courses</h3>
				<CourseCatalogue />
			</div>
			<div>
				<h2>My applications</h2>
				<StudentApplicationsPanel studentUserId={userId} />
			</div>
		</div>
	);
}

export default StudentDashboard;
