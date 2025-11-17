import React from "react";
import { Link } from "react-router-dom";

const linkGroups = [
	{
		title: "Programs",
		links: [
			{ to: "/net", label: "NUST NET" },
			{ to: "/mdcat", label: "MDCAT" },
			{ to: "/nat", label: "NAT" },
		],
	},
	{
		title: "Company",
		links: [
			{ to: "/about", label: "About" },
			{ to: "/contact", label: "Contact" },
			{ to: "/signup", label: "Get Started" },
		],
	},
	{
		title: "Resources",
		links: [
			{ to: "/blog", label: "Insights" },
			{ to: "/faq", label: "FAQs" },
			{ to: "/support", label: "Support" },
		],
	},
];

const socials = [
	{ href: "https://facebook.com", label: "Facebook", initials: "Fb" },
	{ href: "https://instagram.com", label: "Instagram", initials: "Ig" },
	{ href: "https://linkedin.com", label: "LinkedIn", initials: "Ln" },
];

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
			<div className="mx-auto max-w-7xl px-6 py-16">
				<div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
					<div className="space-y-6">
						<Link to="/" className="inline-flex items-center gap-3 text-xl font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
							<span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-bold text-white">
								EP
							</span>
							EntryPrep
						</Link>
						<p className="text-sm text-slate-400">
							Data-backed preparation journeys for NET, MDCAT, and NAT with adaptive roadmaps, live analytics, and curated resources crafted for ambitious students.
						</p>
						<div className="rounded-3xl bg-white/5 p-5 backdrop-blur">
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">Stay in the loop</p>
							<p className="mt-2 text-lg font-semibold text-white">Weekly strategy drops & mock insights</p>
							<form className="mt-4 flex flex-wrap gap-3">
								<label htmlFor="footer-email" className="sr-only">
									Email
								</label>
								<input
									id="footer-email"
									type="email"
									placeholder="you@example.com"
									className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
								/>
								<button
									type="submit"
									className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
								>
									Subscribe
								</button>
							</form>
						</div>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{linkGroups.map((group) => (
							<div key={group.title} className="space-y-4">
								<p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{group.title}</p>
								<ul className="space-y-2">
									{group.links.map(({ to, label }) => (
										<li key={to}>
											<Link
												to={to}
												className="text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
											>
												{label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
					<span>© {year} EntryPrep. All rights reserved.</span>
					<div className="flex items-center gap-4">
						{socials.map(({ href, label, initials }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noreferrer"
								aria-label={label}
								className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
							>
								{initials}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
