// Tutor - update status of application
import StudentApplicationForm from './StudentApplicationForm';
import useApi from '../../hooks/useApi';
import { studentApplicationsApi } from '../../api/studentApplicationApi';
import ApplicationCard from '../../components/ApplicationCard';
import { useState } from 'react';
import type { StudentApplication } from '@/types/studentApplication';
import { Button, Dialog, Portal } from '@chakra-ui/react';
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
				<ul>
					{state.data.map((app) => (
						<li key={app.id}>
							<ApplicationCard application={app} />
							{app.status === 'SUBMITTED' && (
								<Button
									onClick={() => handleReturnToDraft(app.id)}
								>
									Return to Draft
								</Button>
							)}
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
								</>
							)}
						</li>
					))}
				</ul>
			)}
			<Dialog.Root
				open={editingApplication !== null}
				onOpenChange={(event) =>
					!event.open && setEditingApplication(null)
				}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Content>
						<Dialog.Header>Edit Application</Dialog.Header>
						<Dialog.Body>
							{editingApplication && (
								<EditApplicationForm
									application={editingApplication}
									onUpdated={() => {
										setEditingApplication(null);
										refreshData();
									}}
								/>
							)}
						</Dialog.Body>
					</Dialog.Content>
				</Portal>
			</Dialog.Root>
		</div>
	);
}

export default StudentApplicationsPanel;
