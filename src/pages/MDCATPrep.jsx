import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const mdcatSections = [
	{
		title: "Biology",
		description: "Covers human physiology, cell biology, genetics, and reproduction based on the PMC syllabus.",
		image: "https://source.unsplash.com/400x300/?biology",
	},
	{
		title: "Chemistry",
		description: "Includes topics like physical chemistry, organic reactions, and atomic structure relevant to MDCAT.",
		image: "https://source.unsplash.com/400x300/?chemistry",
	},
	{
		title: "Physics",
		description: "Focuses on mechanics, waves, thermodynamics, and modern physics as per MDCAT guidelines.",
		image: "https://source.unsplash.com/400x300/?physics",
	},
	{
		title: "English",
		description: "Tests grammar, vocabulary, and comprehension skills based on prescribed MDCAT English syllabus.",
		image: "https://source.unsplash.com/400x300/?english",
	},
	{
		title: "Logical Reasoning",
		description: "Assesses problem-solving and analytical thinking skills through logic-based questions.",
		image: "https://source.unsplash.com/400x300/?logic",
	},
];

const slugify = (value) => value.toLowerCase().replace(/\s+/g, "-");

const MDCATPrep = () => {
	const sections = useMemo(() => mdcatSections, []);
	return (
		<>
			<main onClick={scroll(0,0)} className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-10">
				<section className="mx-auto grid max-w-6xl gap-12 rounded-[32px] bg-white/95 p-10 shadow-[0_40px_90px_rgba(15,23,42,0.08)] backdrop-blur-lg lg:grid-cols-[1.1fr_1fr] lg:p-14">
					<div className="flex flex-col gap-5">
						<p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-600">Entry Test Preparation</p>
						<h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">Master MDCAT with Confidence</h1>
						<p className="text-base text-slate-500 md:text-lg">
							Personalized study plans, high-yield question banks, and analytics that keep you on track for MDCAT success.
						</p>
						<div className="mt-4 flex flex-wrap gap-4">
							<Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
								Get Started
							</Link>
							<Link to="/mdcat" className="inline-flex items-center justify-center rounded-full border border-slate-300/70 bg-white px-8 py-3 font-semibold text-slate-800 shadow-md transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
								Explore All Sections
							</Link>
						</div>
					</div>
					<div className="relative flex items-center justify-center">
						<div className="absolute inset-6 rounded-[32px] bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-white opacity-70 blur-3xl" />
						<img
							src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80"
							alt="Student preparing for MDCAT"
							className="relative rounded-[28px] object-cover shadow-[0_35px_70px_rgba(15,23,42,0.18)]"
							loading="lazy"
						/>
					</div>
				</section>

				<section className="mx-auto mt-6 max-w-6xl sm:mt-8 lg:mt-10">
					<header className="mx-auto max-w-3xl text-center">
						<h2 className="text-3xl font-bold text-slate-900 md:text-4xl">MDCAT Sections</h2>
						<p className="mt-4 text-base text-slate-500 md:text-lg">
							Master every section of the MDCAT with tailored practice modules, curated resources, and actionable insights.
						</p>
					</header>
					<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
						{sections.map(({ title, description, image }) => (
							<article
								key={title}
								className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								<div className="relative overflow-hidden">
									<img
										src={image}
										alt={title}
										className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
									<span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 shadow-md">
										MDCAT
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-5 p-6">
									<div className="space-y-2">
										<h2 className="text-xl font-semibold text-slate-900">{title}</h2>
										<p className="text-sm text-slate-500">{description}</p>
									</div>
									<Link
										to={`/mdcat/${slugify(title)}`}
										className="mt-auto inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
									>
										Start Practice
									</Link>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default MDCATPrep;
