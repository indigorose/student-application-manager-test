// List the courses view only for the student
import useApi from '../../hooks/useApi';
import { coursesApi } from '../../api/coursesApi';
import type { Course } from '../../types/course';

import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';

function CourseCatalogue() {
	const { state } = useApi<Course[]>(() => coursesApi.getAllCourses());

	if (state.status === 'idle' || state.status == 'loading') {
		return <p>Loading courses</p>;
	}
	if (state.status === 'error') {
		return <p className="error">{state.error.message}</p>;
	}
	return (
		<SimpleGrid>
			{state.data.map((course) => (
				<Box
					mt={4}
					borderWidth={1}
					borderRadius="md"
					p={4}
					key={course.id}
				>
					<Heading size="sm">{course.title}</Heading>
					<Text>{course.description}</Text>
					<Text>Category: {course.category}</Text>
					<Text>Capacity: {course.capacity}</Text>
					<Text>
						Tutor: {course.tutor.firstName} {course.tutor.lastName}
					</Text>
					<Text>Starts: {course.startDate}</Text>
				</Box>
			))}
		</SimpleGrid>
	);
}

export default CourseCatalogue;
