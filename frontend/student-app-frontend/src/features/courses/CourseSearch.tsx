import { coursesApi } from '@/api/coursesApi';
import { NativeSelect, Box, Heading, Text } from '@chakra-ui/react';
import useApi from '@/hooks/useApi';
import { useState } from 'react';

function CourseSearch() {
	const { state: coursesState } = useApi(coursesApi.getAllCourses, []);
	const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
		null,
	);
	const { state: courseState } = useApi(
		() =>
			selectedCourseId
				? coursesApi.getCourseById(selectedCourseId)
				: Promise.resolve(undefined),
		[selectedCourseId],
	);

	return (
		<div>
			{coursesState.status === 'success' && (
				<NativeSelect.Root width="300px">
					<NativeSelect.Field
						placeholder="Select a Course"
						onChange={(event) =>
							setSelectedCourseId(
								Number(event.target.value) || null,
							)
						}
					>
						{coursesState.data.map((course) => (
							<option key={course.id} value={course.id}>
								{' '}
								{course.title}
							</option>
						))}
					</NativeSelect.Field>
				</NativeSelect.Root>
			)}
			{courseState.status === 'success' && courseState.data && (
				<Box mt={4} borderWidth={1} borderRadius="md" p={4}>
					<Heading size="sm">{courseState.data.title}</Heading>
					<Text>{courseState.data.description}</Text>
					<Text>Category: {courseState.data.category}</Text>
					<Text>Capacity: {courseState.data.capacity}</Text>
					<Text>
						Tutor: {courseState.data.tutor.firstName}{' '}
						{courseState.data.tutor.lastName}
					</Text>
					<Text>Starts: {courseState.data.startDate}</Text>
				</Box>
			)}
		</div>
	);
}

export default CourseSearch;
