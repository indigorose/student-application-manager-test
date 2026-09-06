// Tutor Dashboard to view profiles, courses and applications

import useApi from '../hooks/useApi';
import TutorProfileForm from '../features/tutors/TutorProfileForm';
import { tutorsApi } from '../api/tutorApi';
import TutorProfileView from '../components/TutorProfileView';
import UpdateUserForm from '@/features/users/UpdateUserForm';
import TutorCoursesPanel from '@/features/tutors/TutorCoursesPanel';
import TutorApplicationsPanel from '@/features/tutors/TutorsApplicationsPanel';

interface Props {
	userId: number;
}

function TutorDashboard({ userId }: Props) {
	const { state: tutorState, refreshData: reloadTutor } = useApi(
		() => tutorsApi.getTutorById(userId),
		[userId],
	);
	if (tutorState.status === 'loading' || tutorState.status === 'idle') {
		return <p>Loading...</p>;
	}

	if (tutorState.status === 'error') {
		return <p className="error">{tutorState.error.message}</p>;
	}
	if (tutorState.data === undefined) {
		return <TutorProfileForm userId={userId} onCreated={reloadTutor} />;
	}

	const tutor = tutorState.data;

	return (
		<div>
			<div>
				<h2>
					Tutor: {tutor.firstName} {tutor.lastName}' Dashboard
				</h2>
				<UpdateUserForm user={tutor.user} onUpdated={reloadTutor} />
			</div>
			<div>
				<h2>Profile</h2>
				<TutorProfileView
					tutor={tutorState.data}
					onUpdated={reloadTutor}
				/>
			</div>
			<div>
				<h2>My Courses</h2>
				<TutorCoursesPanel tutorUserId={userId} />
			</div>
			<div>
				<TutorApplicationsPanel tutorUserId={userId} />
			</div>
		</div>
	);
}

export default TutorDashboard;
