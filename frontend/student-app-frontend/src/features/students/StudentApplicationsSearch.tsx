// A table of the students applications.

import { useState } from 'react';
import { studentApplicationsApi } from '@/api/studentApplicationApi';
import { studentsApi } from '@/api/studentApi';
import useApi from '../../hooks/useApi';
import { NativeSelect, Table } from '@chakra-ui/react';

function StudentApplicationsSearch() {
	const { state: studentsState } = useApi(studentsApi.getAllStudents, []);
	const [selectedStudentUserId, setSelectedStudentUserId] = useState<
		number | null
	>(null);

	const { state: studentApplicationsState } = useApi(
		() =>
			selectedStudentUserId
				? studentApplicationsApi.getApplicationsByStudent(
						selectedStudentUserId,
					)
				: Promise.resolve([]),
		[selectedStudentUserId],
	);

	return (
		<div>
			{studentsState.status === 'success' && (
				<NativeSelect.Root width="300px">
					<NativeSelect.Field
						placeholder="Select a Student"
						onChange={(event) =>
							setSelectedStudentUserId(
								Number(event.target.value) || null,
							)
						}
					>
						{studentsState.data.map((student) => (
							<option
								key={student.user.id}
								value={student.user.id}
							>
								{student.firstName} {student.lastName}
							</option>
						))}
					</NativeSelect.Field>
					<NativeSelect.Indicator />
				</NativeSelect.Root>
			)}

			{studentApplicationsState.status === 'success' && (
				<Table.Root size="sm" mt={4}>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Title</Table.ColumnHeader>
							<Table.ColumnHeader>Category</Table.ColumnHeader>
							<Table.ColumnHeader>Capacity</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{studentApplicationsState.data.map((application) => (
							<Table.Row key={application.id}>
								<Table.Cell>{}</Table.Cell>
								<Table.Cell>{}</Table.Cell>
								<Table.Cell>{}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			)}
		</div>
	);
}

export default StudentApplicationsSearch;
