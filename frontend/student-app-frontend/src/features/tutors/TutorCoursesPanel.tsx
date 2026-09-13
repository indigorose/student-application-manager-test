import { useState } from 'react';
import useApi from '@/hooks/useApi';
import { coursesApi } from '../../api/coursesApi';
import CourseForm from '../courses/CourseForm';
import { Table, Button, Dialog, Portal, Text } from '@chakra-ui/react';
import type { Course } from '../../types/course';
import TutorApplicationsPanel from './TutorsApplicationsPanel';

interface TutorCoursesPanelProps {
	tutorUserId: number;
}

function TutorCoursesPanel({ tutorUserId }: TutorCoursesPanelProps) {
	const { state, refreshData } = useApi(
		() => coursesApi.getCourseByTutorId(tutorUserId),
		[tutorUserId],
	);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);
	const [reviewingCourseId, setReviewingCourseId] = useState<number | null>(
		null,
	);
	// console.log(typeof reviewingCourseId);
	const [confirmingCourse, setConfirmingCourse] = useState<Course | null>(
		null,
	);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	async function handleWithdrawal(courseId: number) {
		setDeleteError(null);
		try {
			await coursesApi.deleteCourse(courseId);
			setConfirmingCourse(null);
			refreshData();
		} catch (error) {
			setDeleteError(
				error instanceof Error
					? error.message
					: 'Failed to delete course - it may have applications against it.',
			);
		}
	}

	return (
		<div>
			<div>
				<CourseForm tutorUserId={tutorUserId} onCreated={refreshData} />
			</div>
			<div>
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
									Course Start Date
								</Table.ColumnHeader>
								<Table.ColumnHeader>
									Update Course
								</Table.ColumnHeader>
								<Table.ColumnHeader>
									Review Applications
								</Table.ColumnHeader>
								<Table.ColumnHeader>
									Withdraw Course
								</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{state.data.map((course) => (
								<Table.Row key={course.id}>
									<Table.Cell>{course.title}</Table.Cell>
									<Table.Cell>{course.capacity}</Table.Cell>
									<Table.Cell>{course.startDate}</Table.Cell>
									<Table.Cell>
										<Button
											onClick={() =>
												setEditingCourse(course)
											}
										>
											Update
										</Button>
									</Table.Cell>
									<Table.Cell>
										<Button
											onClick={() =>
												setReviewingCourseId(
													reviewingCourseId ===
														course.id
														? null
														: course.id,
												)
											}
										>
											{reviewingCourseId === course.id
												? 'Hide Applications'
												: 'Review applications'}
										</Button>
									</Table.Cell>
									<Table.Cell>
										<Button
											colorPalette="red"
											onClick={() =>
												setConfirmingCourse(course)
											}
										>
											Withdraw
										</Button>
										<Dialog.Root
											open={confirmingCourse !== null}
											onOpenChange={(event) =>
												!event.open &&
												setConfirmingCourse(null)
											}
										>
											<Portal>
												<Dialog.Backdrop />
												<Dialog.Positioner>
													<Dialog.Content>
														<Dialog.Header>
															Withdraw "
															{
																confirmingCourse?.title
															}
															"?
														</Dialog.Header>
														<Dialog.Body>
															Withdrawn courses
															must be resubmitted
															to the database.
															{deleteError && (
																<Text
																	color="red"
																	mt={2}
																>
																	{
																		deleteError
																	}
																</Text>
															)}
														</Dialog.Body>
														<Dialog.Footer>
															<Button
																variant="outline"
																onClick={() =>
																	setConfirmingCourse(
																		null,
																	)
																}
															>
																Cancel
															</Button>
															<Button
																colorPalette="red"
																onClick={() =>
																	confirmingCourse &&
																	handleWithdrawal(
																		confirmingCourse.id,
																	)
																}
															>
																Confirm
																Withdrawal
															</Button>
														</Dialog.Footer>
													</Dialog.Content>
												</Dialog.Positioner>
											</Portal>
										</Dialog.Root>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				)}
				{reviewingCourseId !== null ? (
					<TutorApplicationsPanel
						courseId={reviewingCourseId}
						onDecision={refreshData}
					/>
				) : (
					'Select a course to check applications.'
				)}

				<Dialog.Root
					open={editingCourse !== null}
					onOpenChange={(event) =>
						!event.open && setEditingCourse(null)
					}
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
		</div>
	);
}

export default TutorCoursesPanel;
