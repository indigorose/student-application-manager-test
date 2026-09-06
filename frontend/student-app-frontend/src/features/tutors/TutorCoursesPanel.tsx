import useApi from '@/hooks/useApi';
import { coursesApi } from '../../api/coursesApi';
import CourseForm from '../courses/CourseForm';
import { Table, Button, Dialog, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import type { Course } from '../../types/course';

interface TutorCoursesPanelProps {
	tutorUserId: number;
}

function TutorCoursesPanel({ tutorUserId }: TutorCoursesPanelProps) {
	const { state, refreshData } = useApi(
		() => coursesApi.getCourseByTutorId(tutorUserId),
		[tutorUserId],
	);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);

	return (
		<div>
			<CourseForm tutorUserId={tutorUserId} onCreated={refreshData} />

			{state.status === 'success' && (
				<Table.Root size="md" width="500px">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>
								Course Title
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Course Capacity
							</Table.ColumnHeader>
							<Table.ColumnHeader>
								Update Course
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{state.data.map((course) => (
							<Table.Row key={course.id}>
								<Table.Cell>{course.title}</Table.Cell>
								<Table.Cell>{course.capacity}</Table.Cell>
								<Table.Cell>
									<Button
										onClick={() => setEditingCourse(course)}
									>
										Update
									</Button>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			)}

			<Dialog.Root
				open={editingCourse !== null}
				onOpenChange={(event) => !event.open && setEditingCourse(null)}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>Update Course</Dialog.Header>
							<Dialog.Body>
								{editingCourse && (
									<CourseForm
										tutorUserId={tutorUserId}
										existingCourse={editingCourse}
										onCreated={() => {
											setEditingCourse(null);
											refreshData();
										}}
									/>
								)}
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</div>
	);
}

export default TutorCoursesPanel;
