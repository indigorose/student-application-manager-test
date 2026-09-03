import { api } from '../../api/usersApi';
import useApi from '../../hooks/useApi';
import type { User } from '../../types/user';
import CreateUserForm from './CreateUserForm';
import { Button, Dialog, Table, Portal } from '@chakra-ui/react';
import UpdateUserForm from './UpdateUserForm';
import { useState } from 'react';

function UserList() {
	const { state, refreshData } = useApi<User[]>(() => api.getAllUsers());
	const [updatingUser, setUpdatingUser] = useState<User | null>(null);
	async function handleDeactivate(userId: number) {
		await api.deactivateUser(userId);
		refreshData();
	}

	return (
		<>
			<CreateUserForm onSubmitForm={refreshData} />
			<Button onClick={refreshData}>Refresh List</Button>
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
				<Table.Root size="md" width="500px">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Role</Table.ColumnHeader>
							<Table.ColumnHeader>Email</Table.ColumnHeader>
							<Table.ColumnHeader>Update</Table.ColumnHeader>
							<Table.ColumnHeader>Deactivate</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{state.data.map((user) => (
							<Table.Row key={user.id}>
								<Table.Cell>{user.role}</Table.Cell>
								<Table.Cell>{user.email}</Table.Cell>
								<Table.Cell>
									<Button
										onClick={() => setUpdatingUser(user)}
									>
										Update
									</Button>
								</Table.Cell>
								<Table.Cell>
									<Button
										onClick={() =>
											handleDeactivate(user.id)
										}
									>
										Deactivate
									</Button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			)}

			<Dialog.Root
				open={updatingUser !== null}
				onOpenChange={(event) => !event.open && setUpdatingUser(null)}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>Update user</Dialog.Header>
							<Dialog.Body>
								{updatingUser && (
									<UpdateUserForm
										user={updatingUser}
										onUpdated={() => {
											setUpdatingUser(null);
											refreshData();
										}}
									/>
								)}
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}

export default UserList;
