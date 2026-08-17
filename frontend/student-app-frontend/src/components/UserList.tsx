import { useState, useEffect } from 'react';
import { api, type User } from '../api';
import Card from './Card';

function UserList() {
	type RequestState<T> =
		| { status: 'idle' }
		| { status: 'loading' }
		| { status: 'success'; data: T }
		| { status: 'error'; error: Error };

	const [state, setState] = useState<RequestState<User[]>>({
		status: 'idle',
	});
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		let isCancelled = false;

		async function load() {
			setState({ status: 'loading' });
			try {
				// const response = await api.listDestinations;
				// const destinations = (await response.json()) as Destination[];
				const users = await api.listUsers();
				if (!isCancelled) {
					setState({ status: 'success', data: users });
				}
			} catch (error) {
				if (!isCancelled) {
					setState({
						status: 'error',
						error:
							error instanceof Error
								? error
								: new Error('Unknown error'),
					});
				}
			}
		}

		load();

		return () => {
			isCancelled = true;
		};
	}, [refresh]);

	const refreshUserList = () => {
		setRefresh(!refresh);
	};
	return (
		<>
			<button onClick={refreshUserList}>Refresh List</button>
			{state.status === 'idle' && (
				<p>Nothing loaded yet. Please refresh.</p>
			)}
			{state.status === 'loading' && <p>Loading destinations...</p>}
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
