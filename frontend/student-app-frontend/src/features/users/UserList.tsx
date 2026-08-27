import { api } from '../../api/usersApi';
import Card from '../../components/Card';
import useApi from '../../hooks/useApi';
import type { User } from '../../types/user';
import CreateUserForm from './CreateUserForm';

function UserList() {
	const { state, refreshUserList } = useApi<User[]>(() => api.getAllUsers());
	return (
		<>
			<CreateUserForm onSubmitForm={refreshUserList} />
			<button onClick={refreshUserList}>Refresh List</button>
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
					{state.data.map((user) => (
						<Card
							key={user.id}
							email={user.email}
							role={user.role}
						></Card>
					))}
				</ul>
			)}
		</>
	);
}

export default UserList;
