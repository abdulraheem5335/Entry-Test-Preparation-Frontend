import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
	{ to: "/", label: "Home" },
	{ to: "/net", label: "NET" },
	{ to: "/mdcat", label: "MDCAT" },
	{ to: "/nat", label: "NAT" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
];

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 24);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	const navLinkClasses = ({ isActive }) =>
		`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
			isActive
				? "bg-blue-50 text-blue-600 shadow-sm"
				: "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900"
		}`;

	return (
		<header
			className={`sticky top-0 z-50 border-b border-transparent transition-all duration-300 ${
				isScrolled ? "bg-white/95 shadow-lg shadow-blue-950/5 backdrop-blur-xl border-slate-100" : "bg-white/70 backdrop-blur-sm"
			}`}
		>
			<div
				className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
					isScrolled ? "py-3" : "py-4 lg:py-5"
				}`}
			>
				<Link
					to="/"
					className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
				>
					<span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 text-white">EP</span>
					EntryPrep
				</Link>

				<nav className="hidden lg:flex lg:items-center lg:gap-1">
					{navLinks.map((link) => (
						<NavLink key={link.to} to={link.to} className={navLinkClasses}>
							{link.label}
						</NavLink>
					))}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<Link
						to="/login"
						className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
					>
						Login
					</Link>
					<Link
						to="/signup"
						className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
					>
						Sign Up
					</Link>
				</div>

				<button
					type="button"
					onClick={() => setIsMenuOpen((prev) => !prev)}
					className="relative inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 md:hidden"
					aria-label="Toggle navigation menu"
					aria-expanded={isMenuOpen}
				>
					<span className="sr-only">Open navigation</span>
					<span
						className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : "-translate-y-1"}`}
					/>
					<span className={`mt-1 block h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
					<span
						className={`mt-1 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : "translate-y-1"}`}
					/>
				</button>
			</div>

			<div className={`lg:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}>
				<div
					className={`mx-auto max-w-7xl px-6 pb-6 transition-all duration-300 ${
						isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
					}`}
				>
					<div className="rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-2xl shadow-blue-950/5 backdrop-blur">
						<nav className="flex flex-col gap-2">
							{navLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									onClick={() => setIsMenuOpen(false)}
									className={({ isActive }) =>
										`rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
											isActive
												? "bg-blue-50 text-blue-600 shadow-sm"
												: "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
										}`
									}
              
								>
									{link.label}
								</NavLink>
							))}
						</nav>
						<div className="mt-6 flex flex-col gap-3">
							<Link
								to="/login"
								onClick={() => setIsMenuOpen(false)}
								className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
							>
								Login
							</Link>
							<Link
								to="/signup"
								onClick={() => setIsMenuOpen(false)}
								className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
							>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
