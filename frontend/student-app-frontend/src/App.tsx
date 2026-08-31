import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TutorDashboard from './pages/TutorDashboard';

function App() {
	return (
		<BrowserRouter>
			{/* Navigation */}
			<nav>
				<Link to="">Home</Link> |
				<Link to="/admin-dashboard"> Admin Dashboard</Link> |
				<Link to="/student-dashboard"> Student Dashboard</Link> |
				<Link to="/tutor-dashboard"> Tutor Dashboard </Link> |
			</nav>

			{/* Routes */}
			<Routes>
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route
					path="/student-dashboard"
					element={<StudentDashboard userId={1} />}
				/>
				<Route
					path="/tutor-dashboard"
					element={<TutorDashboard userId={8} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
