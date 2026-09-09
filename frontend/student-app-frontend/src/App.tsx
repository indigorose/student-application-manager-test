import { useState } from 'react';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorDashboard';
import { Button } from '@chakra-ui/react';
import RoleSelector from './components/RoleSelector';
import UserPicker from './components/UserPicker';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';

type Role = 'STUDENT' | 'TUTOR' | 'ADMIN';

function App() {
	const [selectedRole, setSelectedRole] = useState<Role | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	function backToRoles() {
		setSelectedRole(null);
		setSelectedUserId(null);
	}

	if (!selectedRole) {
		return (
			<>
				<Header activeRole={selectedRole} onLogoClick={backToRoles} />
				<RoleSelector onSelect={setSelectedRole} />
			</>
		);
	}

	return (
		<>
			<Header activeRole={selectedRole} onLogoClick={backToRoles} />
			<Box px={6}>
				{!selectedRole && <RoleSelector onSelect={setSelectedRole} />}

				{selectedRole === 'ADMIN' && (
					<div>
						<AdminDashboard />

						<Button onClick={backToRoles}>
							Back to role selection
						</Button>
					</div>
				)}
				{(selectedRole === 'STUDENT' || selectedRole === 'TUTOR') &&
					selectedUserId === null && (
						<div>
							<UserPicker
								role={selectedRole}
								onSelect={setSelectedUserId}
							/>{' '}
							<Button onClick={backToRoles}>
								Back to role selections
							</Button>
						</div>
					)}

				{(selectedRole === 'STUDENT' || selectedRole === 'TUTOR') &&
					selectedUserId !== null && (
						<div>
							<Button onClick={() => setSelectedUserId(null)}>
								Choose a different{' '}
								{selectedRole.toLocaleLowerCase()}
							</Button>
							{selectedRole === 'STUDENT' && (
								<StudentDashboard userId={selectedUserId} />
							)}
							{selectedRole === 'TUTOR' && (
								<TutorDashboard userId={selectedUserId} />
							)}
						</div>
					)}
			</Box>
		</>
	);
}

export default App;
