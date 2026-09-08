import { tutorsApi } from '@/api/tutorApi';
import { Card, Stack, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import useApi from '@/hooks/useApi';
import { studentsApi } from '@/api/studentApi';

interface UserPickerProps {
	role: 'STUDENT' | 'TUTOR';
	onSelect: (userId: number) => void;
}

function UserPicker({ role, onSelect }: UserPickerProps) {
	const { state } = useApi(
		() =>
			role === 'STUDENT'
				? studentsApi.getAllStudents()
				: tutorsApi.getAllTutors(),
		[role],
	);

	if (state.status === 'loading' || state.status === 'idle')
		return <p>Loading...</p>;
	if (state.status === 'error')
		return <p className="error">{state.error.message}</p>;

	return (
		<Stack gap={3}>
			<Heading size="md">Chose a {role.toLowerCase()}</Heading>
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{state.data
					.filter((person) => person.user.isActive)
					.map((person) => (
						<Card.Root
							key={person.id}
							cursor="pointer"
							onClick={() => onSelect(person.user.id)}
							_hover={{ borderColor: 'blue.400' }}
						>
							<Card.Body>
								<Card.Title>
									{person.firstName} {person.lastName}
								</Card.Title>
								<Text fontSize="sm" color="grey.500">
									{person.user.email}
								</Text>
							</Card.Body>
						</Card.Root>
					))}
			</SimpleGrid>
		</Stack>
	);
}

export default UserPicker;
