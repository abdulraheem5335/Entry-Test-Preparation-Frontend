import React from "react";
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NETPrep from './pages/NETPrep';
import MDCATPrep from './pages/MDCATPrep';
import NATPrep from './pages/NATPrep';
import About from './pages/About';
import Contact from './pages/Contact';
import Authpage from './pages/Authpage.jsx';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
function RootLayout() {
	// layout that provides Navbar and renders the active route via Outlet
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'net', element: <NETPrep /> },
			{ path: 'mdcat', element: <MDCATPrep /> },
			{ path: 'nat', element: <NATPrep /> },
			{ path: 'about', element: <About /> },
			{ path: 'contact', element: <Contact /> },
			{ path: 'auth', element: <Authpage /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'quiz', element: <Quiz /> }
		],
	},
]);

export default router;
