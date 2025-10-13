import React from "react";
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NETPrep from './pages/NETPrep';
import MDCATPrep from './pages/MDCATPrep';
import NATPrep from './pages/NATPrep';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import React from 'react';
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
			{ path: 'login', element: <Login /> },
			{ path: 'signup', element: <Signup /> },
			{ path: 'dashboard', element: <Dashboard /> },
		],
	},
]);

export default router;
