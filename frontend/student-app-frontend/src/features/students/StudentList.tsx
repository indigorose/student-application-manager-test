// A list of students for the admin dashboard
import { api } from '../../api/studentApi';
import useApi from '../../hooks/useApi';
import type { Student } from '../../types/student';

function UserList() {
	const { state, refreshData } = useApi<Student[]>(() =>
		api.getAllStudents(),
	);
	return (
		<>
			<button onClick={refreshData}>Refresh List</button>
			{state.status === 'idle' && (
				<p>Nothing loaded yet. Please refresh.</p>
			)}
			{state.status === 'loading' && <p>Loading users...</p>}
			{state.status === 'error' && (
				<p className="error">
					Something went wrong: {state.error.message}
				</p>
			)}
			{state.status === 'success' && (
				<ul>
					{state.data.map((student) => (
						<li>
							<p>
								{student.firstName} {student.lastName}
							</p>
							<p>Email: {student.user.email}</p>
						</li>
					))}
				</ul>
			)}
		</>
	);
}

export default UserList;
