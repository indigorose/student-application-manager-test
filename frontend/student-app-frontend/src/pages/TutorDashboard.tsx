// Tutor Dashboard to view profiles, courses and applications

import useApi from '../hooks/useApi';
import TutorProfileForm from '../features/tutors/TutorProfileForm';
import { tutorsApi } from '../api/tutorApi';
import TutorProfileView from '../components/TutorProfileView';
import UpdateUserForm from '@/features/users/UpdateUserForm';
import TutorCoursesPanel from '@/features/tutors/TutorCoursesPanel';
import { Stack, Box, Heading, Tabs } from '@chakra-ui/react';
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
			<Box as="div" my="50px">
				<Heading size="2xl" fontWeight="bold">
					Welcome, {tutor.firstName} {tutor.lastName}
				</Heading>
			</Box>

			<Tabs.Root defaultValue="profile">
				<Tabs.List>
					<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
					<Tabs.Trigger value="edit">Edit details</Tabs.Trigger>
					<Tabs.Trigger value="courses">Courses</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="profile">
					<TutorProfileView tutor={tutor} onUpdated={reloadTutor} />
				</Tabs.Content>
				<Tabs.Content value="edit">
					<Stack gap={6}>
						<Box>
							<Heading size="sm" mb={2}>
								Account
							</Heading>
							<UpdateUserForm
								user={tutor.user}
								onUpdated={reloadTutor}
							/>
						</Box>
						<Box>
							<Heading size="sm" mb={2}>
								Profile details
							</Heading>
							<TutorProfileForm
								userId={userId}
								onCreated={reloadTutor}
							/>
						</Box>
					</Stack>
				</Tabs.Content>
				<Tabs.Content value="courses">
					<TutorCoursesPanel tutorUserId={userId} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}

export default TutorDashboard;
