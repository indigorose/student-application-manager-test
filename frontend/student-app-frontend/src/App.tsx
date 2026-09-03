import { useState } from 'react';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorDashboard';
import { Button } from '@chakra-ui/react';
import RoleSelector from './components/RoleSelector';

type Role = 'STUDENT' | 'TUTOR' | 'ADMIN';

function App() {
	const [selectedRole, setSelectedRole] = useState<Role | null>(null);

	if (!selectedRole) {
		return <RoleSelector onSelect={setSelectedRole} />;
	}
	return (
		<div>
			<Button onClick={() => setSelectedRole(null)}>
				Back to role selection
			</Button>
			{selectedRole === 'STUDENT' && <StudentDashboard userId={1} />}
			{selectedRole === 'TUTOR' && <TutorDashboard userId={8} />}
			{selectedRole === 'ADMIN' && <AdminDashboard />}
		</div>
	);
}

export default App;
