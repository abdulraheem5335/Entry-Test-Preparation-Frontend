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

// Profile Pages
import CoursesEnrolled from "./pages/CoursesEnrolled";
import ProfileAccount from "./pages/ProfileAccount";
import Settings from "./pages/Settings";
import Premium from "./pages/Premium";
import Notifications from "./pages/Notifications";

// NET Learning Platform Pages
import SubjectSelection from "./pages/net/SubjectSelection";
import ChapterSelection from "./pages/net/ChapterSelection";
import TopicsPage from "./pages/net/TopicsPage";
import MCQPractice from "./pages/net/MCQPractice";
import NotesViewer from "./pages/net/NotesViewer";
import VideoPlayer from "./pages/net/VideoPlayer";

// MDCAT Pages
import MDCATSubjectSelection from "./pages/mdcat/SubjectSelection";

// NAT Pages
import NATSubjectSelection from "./pages/nat/SubjectSelection";

// Shared Pages (for MDCAT and NAT)
import { ChapterSelection as SharedChapterSelection, TopicsPage as SharedTopicsPage } from "./pages/shared";

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
			{ path: "user-info", element: <Userinfo /> },
			{ path: "quiz", element: <Quiz /> },

			// NET Learning Platform Routes
			{ path: "net/:stream", element: <SubjectSelection /> },
			{ path: "net/:stream/:subject", element: <ChapterSelection /> },
			{ path: "net/:stream/:subject/:chapter", element: <TopicsPage /> },
			{ path: "net/:stream/:subject/:chapter/:topic/mcqs", element: <MCQPractice /> },
			{ path: "net/:stream/:subject/:chapter/:topic/notes", element: <NotesViewer /> },
			{ path: "net/:stream/:subject/:chapter/:topic/video", element: <VideoPlayer /> },

			// MDCAT Learning Platform Routes
			{ path: "mdcat/:stream", element: <MDCATSubjectSelection /> },
			{ path: "mdcat/:stream/:subject", element: <SharedChapterSelection /> },
			{ path: "mdcat/:stream/:subject/:chapter", element: <SharedTopicsPage /> },
			{ path: "mdcat/:stream/:subject/:chapter/:topic/mcqs", element: <MCQPractice /> },
			{ path: "mdcat/:stream/:subject/:chapter/:topic/notes", element: <NotesViewer /> },
			{ path: "mdcat/:stream/:subject/:chapter/:topic/video", element: <VideoPlayer /> },

			// NAT Learning Platform Routes
			{ path: "nat/:stream", element: <NATSubjectSelection /> },
			{ path: "nat/:stream/:subject", element: <SharedChapterSelection /> },
			{ path: "nat/:stream/:subject/:chapter", element: <SharedTopicsPage /> },
			{ path: "nat/:stream/:subject/:chapter/:topic/mcqs", element: <MCQPractice /> },
			{ path: "nat/:stream/:subject/:chapter/:topic/notes", element: <NotesViewer /> },
			{ path: "nat/:stream/:subject/:chapter/:topic/video", element: <VideoPlayer /> },

			// Dashboard section wrapped with Sidebar
			{
				path: "/profile",
				element: <ProfileLayout />,
				children: [
					{ index: true, element: <Dashboard /> },
					{ path: "dashboard", element: <Dashboard /> },
					{ path: "course", element: <Course /> },
					{ path: "leaderboard", element: <Leaderboard /> },
					{ path: "enrolled", element: <CoursesEnrolled /> },
					{ path: "account", element: <ProfileAccount /> },
					{ path: "settings", element: <Settings /> },
					{ path: "premium", element: <Premium /> },
					{ path: "notifications", element: <Notifications /> },
				],
			},
		],
	},
]);

export default router;
