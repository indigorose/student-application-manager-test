import { useState } from 'react';
import useApi from '../hooks/useApi';
import StudentProfileForm from '../features/students/StudentProfileForm';
import { studentsApi } from '../api/studentApi';
import StudentProfileView from '../components/StudentProfileView';
import UpdateUserForm from '@/features/users/UpdateUserForm';
import CourseCatalogue from '@/features/courses/CourseCatalogue';
import StudentApplicationsPanel from '@/features/student-applications/StudentApplicationsPanel';
import { api } from '../api/usersApi';
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
interface StudentDashboardProps {
	userId: number;
	onDeactivated: () => void;
}

function StudentDashboard({ userId, onDeactivated }: StudentDashboardProps) {
	const { state: studentState, refreshData: reloadStudent } = useApi(
		() => studentsApi.getStudentById(userId),
		[userId],
	);
	const [confirmingDeactivate, setConfirmingDeactivate] = useState(false);

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
	async function handleDeactivate() {
		await api.deactivateUser(userId);
		onDeactivated();
	}

	return (
		<div>
			<Box as="div" my="50px">
				<Heading size="2xl" fontWeight="bold">
					Welcome, {student.firstName} {student.lastName}
				</Heading>
			</Box>
			<Tabs.Root defaultValue="profile">
				<Tabs.List>
					<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
					<Tabs.Trigger value="edit">Edit details</Tabs.Trigger>
					<Tabs.Trigger value="courses">Courses</Tabs.Trigger>
					<Tabs.Trigger value="applications">
						Applications
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="profile">
					<StudentProfileView
						student={student}
						onUpdated={reloadStudent}
					/>
				</Tabs.Content>
				<Tabs.Content value="edit">
					<Stack gap={6}>
						<Box>
							<Heading size="lg" mb={2}>
								Account
							</Heading>
							<UpdateUserForm
								user={student.user}
								onUpdated={reloadStudent}
							/>
						</Box>
						<Box>
							<Heading size="sm" mb={2}>
								Profile details
							</Heading>
							<StudentProfileForm
								userId={userId}
								existingStudent={student}
								onCreated={reloadStudent}
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
					<CourseCatalogue />
				</Tabs.Content>
				<Tabs.Content value="applications">
					<StudentApplicationsPanel studentUserId={userId} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}

export default StudentDashboard;
