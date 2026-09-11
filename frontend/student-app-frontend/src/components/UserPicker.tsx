import { Card, Stack, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import useApi from '@/hooks/useApi';
import { api } from '../api/usersApi';

interface UserPickerProps {
	role: 'STUDENT' | 'TUTOR';
	onSelect: (userId: number) => void;
}

function UserPicker({ role, onSelect }: UserPickerProps) {
	const { state } = useApi(() => api.getUsersByRole(role), [role]);

	if (state.status === 'loading' || state.status === 'idle')
		return <p>Loading...</p>;
	if (state.status === 'error')
		return <p className="error">{state.error.message}</p>;

	return (
		<Stack gap={3}>
			<Heading size="md">Choose a {role.toLowerCase()}</Heading>
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{state.data
					.filter((user) => user.isActive)
					.map((user) => (
						<Card.Root
							key={user.id}
							cursor="pointer"
							onClick={() => onSelect(user.id)}
							_hover={{ borderColor: 'blue.400' }}
						>
							<Card.Body>
								<Card.Title>{user.email}</Card.Title>
								<Text fontSize="sm" color="grey.500">
									Click to set up or view profile
								</Text>
							</Card.Body>
						</Card.Root>
					))}
			</SimpleGrid>
		</Stack>
	);
}

export default UserPicker;
