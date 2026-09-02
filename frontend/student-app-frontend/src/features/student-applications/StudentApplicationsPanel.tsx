// Tutor - update status of application
import StudentApplicationForm from './StudentApplicationForm';
import useApi from '../../hooks/useApi';
import { api } from '../../api/studentApplicationApi';
import ApplicationCard from '../../components/ApplicationCard';

interface Props {
	studentUserId: number;
}

function StudentApplicationsPanel({ studentUserId }: Props) {
	const { state, refreshData } = useApi(
		() => api.getApplicationsByStudent(studentUserId),
		[studentUserId],
	);

	return (
		<div>
			<StudentApplicationForm
				studentUserId={studentUserId}
				onSubmitted={refreshData}
			/>
			{state.status === 'success' && (
				<ul>
					{state.data.map((app) => (
						<li key={app.id}>
							<ApplicationCard application={app} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default StudentApplicationsPanel;
