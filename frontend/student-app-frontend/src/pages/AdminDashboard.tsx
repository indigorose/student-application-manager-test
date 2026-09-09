// import UserList from '../features/users/UserList';

import { Tabs, Heading } from '@chakra-ui/react';
import TutorCourseSearch from '@/features/tutors/TutorCoursesSearch';
import StudentApplicationsSearch from '@/features/students/StudentApplicationsSearch';
import CourseSearch from '@/features/courses/CourseSearch';
import UserList from '@/features/users/UserList';

function AdminDashboard() {
	return (
		<>
			<Heading mx="auto" pb="20px" fontSize="2rem">
				<h2>Admin Dashboard</h2>
			</Heading>
			<Tabs.Root defaultValue="userList">
				<Tabs.List>
					<Tabs.Trigger value="userList">User List</Tabs.Trigger>
					<Tabs.Trigger value="tutorCourses">
						Courses by Tutor
					</Tabs.Trigger>
					<Tabs.Trigger value="studentApplications">
						Student Applications
					</Tabs.Trigger>
					<Tabs.Trigger value="courseDetail">Courses</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="userList">
					<UserList />
				</Tabs.Content>
				<Tabs.Content value="tutorCourses">
					<TutorCourseSearch />
				</Tabs.Content>
				<Tabs.Content value="studentApplications">
					<StudentApplicationsSearch />
				</Tabs.Content>
				<Tabs.Content value="courseDetail">
					<CourseSearch />
				</Tabs.Content>
			</Tabs.Root>
		</>
	);
}

export default AdminDashboard;
