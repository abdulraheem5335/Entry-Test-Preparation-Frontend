import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import NETPrep from "./pages/NETPrep";
import MDCATPrep from "./pages/MDCATPrep";
import NATPrep from "./pages/NATPrep";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Authpage from "./pages/Authpage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Profile } from "./pages/Profile";
import Quiz from "./pages/Quiz";
import Userinfo from "./pages/Userinfo.jsx";
import Course from "./pages/courses_enrolled.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

// --- Root layout: Navbar always visible ---
function RootLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}

// --- Dashboard layout: Sidebar always visible ---
function ProfileLayout() {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<div className="flex-1 p-4">
				<Outlet />
			</div>
		</div>
	);
}

// --- Router configuration ---
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "net", element: <NETPrep /> },
			{ path: "mdcat", element: <MDCATPrep /> },
			{ path: "nat", element: <NATPrep /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "profile", element: <Profile /> },
			{ path: "auth", element: <Authpage /> },
			{path:"user-info", element:<Userinfo/>},
			{ path: "quiz", element: <Quiz /> },

			// Dashboard section wrapped with Sidebar
			{
				path: "/profile",
				element: <ProfileLayout />,
				children: [
					{ index: true, element: <Dashboard /> },
					{ path: "dashboard", element: <Dashboard/> },
					{ path: "course", element: <Course/> },
					{ path: "leaderboard", element: <Leaderboard/> },

				],
			},
		],
	},
]);

export default router;
