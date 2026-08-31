import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';

function App() {
	return (
		<BrowserRouter>
			{/* Navigation */}
			<nav>
				<Link to="">Home</Link> |
				<Link to="/admin-dashboard">Admin Dashboard</Link> |
				<Link to="/student-dashboard">Students</Link>
			</nav>

			{/* Routes */}
			<Routes>
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route
					path="/student-dashboard"
					element={<StudentDashboard userId={1} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
