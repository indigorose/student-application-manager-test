import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';

function App() {
	return (
		<BrowserRouter>
			{/* Navigation */}
			<nav>
				<Link to="">Home</Link> |
				<Link to="/admin-dashboard">Admin Dashboard</Link>
			</nav>

			{/* Routes */}
			<Routes>
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
