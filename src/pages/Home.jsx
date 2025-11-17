import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const examCards = [
	{
		title: "MDCAT Mastery",
		description: "Comprehensive biology, chemistry, physics, and English drills aligned with the latest PMC blueprint.",
		image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
		to: "/mdcat",
		tag: "Medical",
	},
	{
		title: "NUST NET Tracks",
		description: "Adaptive plans for every NET variant with subject-weighted insights and realistic mocks.",
		image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80",
		to: "/net",
		tag: "Engineering",
	},
	{
		title: "NAT Excellence",
		description: "Targeted prep for NAT-IE, IM, ICS, ICom, and IA with curated resources and analytics.",
		image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
		to: "/nat",
		tag: "Undergraduate",
	},
];

const Home = () => {
	return (
		<main onClick={scroll(0,0)} className="bg-gradient-to-b from-slate-50 via-white to-slate-50">

			{/* HERO SECTION */}
			<section className="relative overflow-hidden pt-7 pb-16 sm:pt-16 sm:pb-20 lg:pt-10 lg:pb-24">
				<div className="absolute inset-0 pointer-events-none">
					<div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25)_0%,_transparent_55%)]" />
				</div>

				<div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:gap-16 lg:flex-row lg:items-center">
					
					{/* HERO TEXT */}
					<div className="max-w-2xl space-y-6 sm:space-y-8">
						<h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
							Premium Entry Test Prep for Ambitious Students
						</h1>
						<p className="text-lg text-slate-600 sm:text-xl">
							Personalized study paths, AI-assisted analytics, and beautiful dashboards that keep you focused on the MDCAT, NET, and NAT goals that matter.
						</p>

						<div className="flex flex-wrap gap-4">
							<Link
								to="/signup"
								className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
							>
								Get Started
							</Link>
							<Link
								to="/mdcat"
								className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
							>
								Explore Programs
							</Link>
						</div>

						<div className="flex flex-wrap gap-8 pt-4 text-sm text-slate-500">
							<div>
								<p className="text-3xl font-bold text-slate-900">15K+</p>
								<span>Active learners</span>
							</div>
							<div>
								<p className="text-3xl font-bold text-slate-900">92%</p>
								<span>Score improvement</span>
							</div>
							<div>
								<p className="text-3xl font-bold text-slate-900">4.9/5</p>
								<span>Average rating</span>
							</div>
						</div>
					</div>

					{/* HERO IMAGE */}
					<div className="relative w-full mt-12 lg:mt-0">
						<div className="absolute top-4 left-6 right-6 bottom-6 rounded-[36px] bg-gradient-to-br from-blue-100 via-white to-transparent blur-3xl" />
						<div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-slate-900/80 shadow-[0_40px_90px_rgba(15,23,42,0.18)]">
							<img
								src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1000&q=80"
								alt="Focused students collaborating"
								className="h-full w-full object-cover"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
							<div className="absolute top-6 left-6 flex flex-wrap gap-3">
								<span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-800">
									Live Prep
								</span>
								<span className="rounded-full bg-blue-500/80 px-4 py-2 text-xs font-semibold text-white">
									Realtime Updates
								</span>
							</div>
							<div className="absolute inset-x-6 bottom-6 space-y-5 text-white">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">Next milestone</p>
									<h3 className="mt-2 text-2xl font-semibold">Adaptive Physics Drill</h3>
									<p className="text-sm text-white/80">Today · 07:00 PM</p>
								</div>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
										<p className="text-xs uppercase tracking-[0.28em] text-white/70">Readiness</p>
										<p className="mt-2 text-3xl font-bold">88%</p>
										<p className="text-xs text-white/70">+12% vs last week</p>
									</div>
									<div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
										<p className="text-xs uppercase tracking-[0.28em] text-white/70">Active modules</p>
										<p className="mt-2 text-3xl font-bold">3</p>
										<p className="text-xs text-white/70">Biology · Mechanics · Vocab</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* WHY CHOOSE US */}
			<section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
				<div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl shadow-slate-200/60">
					<p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Why students choose us</p>
					<div className="mt-6 grid gap-8 md:grid-cols-3">
						{[
							{ title: "Adaptive Roadmaps", copy: "Dynamic study plans that shift with your strengths and weak spots." },
							{ title: "Exam-Grade Analytics", copy: "Realistic benchmarks, percentile tracking, and predictive scoring." },
							{ title: "Premium Content", copy: "HD video lessons, expert notes, and high-yield question banks." },
						].map((feature) => (
							<div key={feature.title} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white">
								<p className="text-lg font-semibold text-slate-900">{feature.title}</p>
								<p className="mt-3 text-sm text-slate-600">{feature.copy}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* EXAM TRACKS */}
			<section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600">Explore programs</p>
					<h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Choose your exam track</h2>
					<p className="mt-3 text-base text-slate-500">
						Each pathway includes curated content, live support, and data-backed insights tuned to its syllabus.
					</p>
				</div>
				<div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
					{examCards.map(({ title, description, image, to, tag }) => (
						<article
							key={title}
							className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
						>
							<div className="relative overflow-hidden">
								<img
									src={image}
									alt={title}
									className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
								<span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-800 shadow-md">
									{tag}
								</span>
							</div>
							<div className="flex flex-1 flex-col gap-4 p-6">
								<div className="space-y-2">
									<h3 className="text-xl font-semibold text-slate-900">{title}</h3>
									<p className="text-sm text-slate-500">{description}</p>
								</div>
								<Link
									to={to}
									className="mt-auto inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
								>
									Explore Track
								</Link>
							</div>
						</article>
					))}
				</div>
			</section>

			{/* CTA SECTION */}
			<section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
				<div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 px-10 py-14 text-white shadow-[0_35px_80px_rgba(15,23,42,0.35)]">
					<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">Ready when you are</p>
							<h3 className="mt-4 text-3xl font-semibold leading-tight">Join thousands of high-achievers confident in their prep.</h3>
							<p className="mt-3 text-sm text-white/80">Cancel anytime · Real mentors · Live dashboards</p>
						</div>
						<div className="flex flex-wrap gap-4">
							<Link
								to="/signup"
								className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5"
							>
								Start Free Trial
							</Link>
							<Link
								to="/contact"
								className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
							>
								Schedule a Demo
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Footer/>
		</main>
	);
};

export default Home;
