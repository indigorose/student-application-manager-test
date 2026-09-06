import { studentApplicationsApi } from '@/api/studentApplicationApi';
import useApi from '../../hooks/useApi';
import { Table, Button } from '@chakra-ui/react';

interface TutorCoursesPanelProps {
	tutorUserId: number;
}

function TutorApplicationsPanel({ tutorUserId }: TutorCoursesPanelProps) {
	const { state, refreshData } = useApi(
		() => studentApplicationsApi.getApplicationsByTutor(tutorUserId),
		[tutorUserId],
	);
	async function handleDecision(
		applicationId: number,
		status: 'APPROVED' | 'REJECTED',
	) {
		await studentApplicationsApi.updateApplicationStatus(applicationId, {
			status,
		});
		refreshData();
	}

	return (
		<div>
			{state.status === 'success' && (
				<Table.Root size="md" width="500px">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>
								Student Full Name
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Course Title
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Personal Statement
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Application Status
							</Table.ColumnHeader>
							<Table.ColumnHeader>Decision</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{state.data.map((app) => (
							<Table.Row key={app.id}>
								<Table.Cell>
									{app.student.firstName}{' '}
									{app.student.lastName}
								</Table.Cell>
								<Table.Cell>{app.course.title}</Table.Cell>
								<Table.Cell>{app.personalStatement}</Table.Cell>
								<Table.Cell>{app.status}</Table.Cell>
								<Table.Cell>
									{app.status === 'SUBMITTED' && (
										<>
											<Button
												colorPalette="green"
												onClick={() =>
													handleDecision(
														app.id,
														'APPROVED',
													)
												}
											>
												Approve
											</Button>
											<Button
												colorPalette="red"
												onClick={() =>
													handleDecision(
														app.id,
														'REJECTED',
													)
												}
											>
												Reject
											</Button>
										</>
									)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			)}
		</div>
	);
}

export default TutorApplicationsPanel;
