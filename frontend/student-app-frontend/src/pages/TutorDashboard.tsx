// Tutor Dashboard to view profiles, courses and applications
import { useState } from 'react';
import useApi from '../hooks/useApi';
import TutorProfileForm from '../features/tutors/TutorProfileForm';
import { tutorsApi } from '../api/tutorApi';
import TutorProfileView from '../components/TutorProfileView';
import UpdateUserForm from '@/features/users/UpdateUserForm';
import TutorCoursesPanel from '@/features/tutors/TutorCoursesPanel';
import {
	Stack,
	Box,
	Heading,
	Tabs,
	Text,
	Button,
	Dialog,
	Portal,
} from '@chakra-ui/react';
import { api } from '../api/usersApi';
interface TutorDashboardProps {
	userId: number;
	onDeactivated: () => void;
}

function TutorDashboard({ userId, onDeactivated }: TutorDashboardProps) {
	const { state: tutorState, refreshData: reloadTutor } = useApi(
		() => tutorsApi.getTutorById(userId),
		[userId],
	);

	const [confirmingDeactivate, setConfirmingDeactivate] = useState(false);

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

	async function handleDeactivate() {
		await api.deactivateUser(userId);
		onDeactivated();
	}

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
							<Heading size="lg" mb={2}>
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
								existingTutor={tutor}
								onCreated={reloadTutor}
							/>
						</Box>
						<Box borderTopWidth={1} pt={4}>
							<Heading size="sm" mb={2} color="red.600">
								Danger Zone
							</Heading>
							<Text fontSize="sm" color="gray.500" mb={2}>
								Deactivating your account will sign you out and
								hide your profile from the listings.
							</Text>
							<Button
								colorPalette="red"
								onClick={() => setConfirmingDeactivate(true)}
							>
								Deactivate my account
							</Button>
							<Dialog.Root
								open={confirmingDeactivate}
								onOpenChange={(event) =>
									setConfirmingDeactivate(event.open)
								}
							>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content>
											<Dialog.Header>
												Deactivate account?
											</Dialog.Header>
											<Dialog.Body>
												This will sign you out. An admin
												can reactivate your account
												later.
											</Dialog.Body>
											<Dialog.Footer>
												<Button
													variant="outline"
													onClick={() =>
														setConfirmingDeactivate(
															false,
														)
													}
												>
													Cancel
												</Button>
												<Button
													colorPalette="red"
													onClick={handleDeactivate}
												>
													Deactivate
												</Button>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
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
