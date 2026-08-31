// Tutor Dashboard to view profiles, courses and applications

import useApi from '../hooks/useApi';
import TutorProfileForm from '../features/tutors/TutorProfileForm';
import { api } from '../api/tutorApi';
import TutorProfileView from '../components/TutorProfileView';

interface Props {
	userId: number;
}

function TutorDashboard({ userId }: Props) {
	const { state: tutorState, refreshData: reloadTutor } = useApi(
		() => api.getTutorById(userId),
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

	return <TutorProfileView tutor={tutorState.data} onUpdated={reloadTutor} />;
}

export default TutorDashboard;
