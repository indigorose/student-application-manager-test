// Course search by Tutor
import { useState } from 'react';
import { coursesApi } from '../../api/coursesApi';
import { tutorsApi } from '../../api/tutorApi';
import useApi from '../../hooks/useApi';
import { NativeSelect, Table } from '@chakra-ui/react';

function TutorCourseSearch() {
	const { state: tutorsState } = useApi(tutorsApi.getAllTutors, []);
	const [selectedTutorUserId, setSelectedTutorUserId] = useState<
		number | null
	>(null);

	const { state: coursesState } = useApi(
		() =>
			selectedTutorUserId
				? coursesApi.getCourseByTutorId(selectedTutorUserId)
				: Promise.resolve([]),
		[selectedTutorUserId],
	);

	return (
		<div>
			{tutorsState.status === 'success' && (
				<NativeSelect.Root width="300px">
					<NativeSelect.Field
						placeholder="Select a Tutor"
						onChange={(event) =>
							setSelectedTutorUserId(
								Number(event.target.value) || null,
							)
						}
					>
						{tutorsState.data.map((tutor) => (
							<option key={tutor.user.id} value={tutor.user.id}>
								{tutor.firstName} {tutor.lastName} -{' '}
								{tutor.department}
							</option>
						))}
					</NativeSelect.Field>
					<NativeSelect.Indicator />
				</NativeSelect.Root>
			)}

			{coursesState.status === 'success' && (
				<Table.Root size="sm" mt={4}>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Title</Table.ColumnHeader>
							<Table.ColumnHeader>Category</Table.ColumnHeader>
							<Table.ColumnHeader>Capacity</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{coursesState.data.map((course) => (
							<Table.Row key={course.id}>
								<Table.Cell>{course.title}</Table.Cell>
								<Table.Cell>{course.category}</Table.Cell>
								<Table.Cell>{course.capacity}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			)}
		</div>
	);
}

export default TutorCourseSearch;
