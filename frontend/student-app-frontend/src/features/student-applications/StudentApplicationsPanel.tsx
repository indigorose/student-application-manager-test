// Tutor - update status of application
import StudentApplicationForm from './StudentApplicationForm';
import useApi from '../../hooks/useApi';
import { studentApplicationsApi } from '../../api/studentApplicationApi';
import { useState } from 'react';
import type { StudentApplication } from '@/types/studentApplication';
import { Table, Button, Dialog, Portal } from '@chakra-ui/react';
import EditApplicationForm from './EditApplicationForm';

interface Props {
	studentUserId: number;
}

function StudentApplicationsPanel({ studentUserId }: Props) {
	const { state, refreshData } = useApi(
		() => studentApplicationsApi.getApplicationsByStudent(studentUserId),
		[studentUserId],
	);
	const [editingApplication, setEditingApplication] =
		useState<StudentApplication | null>(null);

	async function handleReturnToDraft(applicationId: number) {
		await studentApplicationsApi.returnToDraft(applicationId);
		refreshData();
	}

	async function handleSubmitDraft(applicationId: number) {
		await studentApplicationsApi.submitDraft(applicationId);
		refreshData();
	}

	return (
		<div>
			<StudentApplicationForm
				studentUserId={studentUserId}
				onCreated={refreshData}
			/>
			{state.status === 'success' && (
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Course</Table.ColumnHeader>
							<Table.ColumnHeader>
								Application Status
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Personal Statement
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Change Application Status
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Submit Application
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{state.data.map((app) => (
							<Table.Row key={app.id}>
								<Table.Cell>{app.course.title}</Table.Cell>
								<Table.Cell>{app.status}</Table.Cell>
								<Table.Cell>{app.personalStatement}</Table.Cell>
								<Table.Cell>
									{app.status === 'SUBMITTED' && (
										<Button
											onClick={() =>
												handleReturnToDraft(app.id)
											}
										>
											Return to Draft
										</Button>
									)}
								</Table.Cell>
								<Table.Cell>
									{app.status === 'DRAFT' && (
										<>
											<Button
												onClick={() =>
													setEditingApplication(app)
												}
											>
												Update
											</Button>
											<Button
												colorPalette="blue"
												onClick={() =>
													handleSubmitDraft(app.id)
												}
											>
												Submit
											</Button>
											<Dialog.Root
												open={
													editingApplication !== null
												}
												onOpenChange={(event) =>
													!event.open &&
													setEditingApplication(null)
												}
											>
												<Portal>
													<Dialog.Backdrop />
													<Dialog.Content>
														<Dialog.Header>
															Edit Application
														</Dialog.Header>
														<Dialog.Body>
															{editingApplication && (
																<EditApplicationForm
																	application={
																		editingApplication
																	}
																	onUpdated={() => {
																		setEditingApplication(
																			null,
																		);
																		refreshData();
																	}}
																/>
															)}
														</Dialog.Body>
													</Dialog.Content>
												</Portal>
											</Dialog.Root>
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

export default StudentApplicationsPanel;
