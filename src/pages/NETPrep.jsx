import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const netCards = [
	{
		id: 1,
		title: "NET-Engineering",
		description: "For Engineering & Computing programs. Pre-Eng/ICS/Pre-Med with Additional Math.",
		subjects: [
			{ name: "Mathematics", weight: 50 },
			{ name: "Physics", weight: 30 },
			{ name: "English", weight: 20 }
		],
		image: "https://source.unsplash.com/400x300/?engineering",
		accent: "from-blue-500 to-sky-500"
	},
	{
		id: 2,
		title: "NET-Applied Sciences",
		description: "For Pre-Medical students applying to Biotechnology, Chemistry, etc.",
		subjects: [
			{ name: "Biology", weight: 50 },
			{ name: "Chemistry", weight: 30 },
			{ name: "English", weight: 20 }
		],
		image: "https://source.unsplash.com/400x300/?laboratory",
		accent: "from-emerald-500 to-teal-500"
	},
	{
		id: 3,
		title: "NET-Business & Social Sciences",
		description: "For any HSSC background applying to BBA, Economics, LLB, etc.",
		subjects: [
			{ name: "Quantitative Mathematics", weight: 50 },
			{ name: "English", weight: 50 }
		],
		image: "https://source.unsplash.com/400x300/?business",
		accent: "from-amber-500 to-orange-500"
	},
	{
		id: 4,
		title: "NET-Architecture",
		description: "For students with Math & Physics applying to Architecture or Industrial Design.",
		subjects: [
			{ name: "Design Aptitude", weight: 50 },
			{ name: "Mathematics", weight: 30 },
			{ name: "English", weight: 20 }
		],
		image: "https://source.unsplash.com/400x300/?architecture",
		accent: "from-purple-500 to-indigo-500"
	},
	{
		id: 5,
		title: "NET-Natural Sciences",
		description: "For students applying to BS Mathematics, Physics, or Chemistry from other backgrounds.",
		subjects: [
			{ name: "Mathematics", weight: 50 },
			{ name: "English", weight: 50 }
		],
		image: "https://source.unsplash.com/400x300/?science",
		accent: "from-cyan-500 to-blue-500"
	}
];

const slugify = (value) => value.toLowerCase().replace(/\s+/g, "-");

const NETPrep = () => {
	const tracks = useMemo(() => netCards, []);
	return (
		<>
			<main onClick={scroll(0,0)} className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-10">
				<section className="mx-auto grid max-w-6xl gap-12 rounded-[32px] bg-white/95 p-10 shadow-[0_40px_90px_rgba(15,23,42,0.08)] backdrop-blur-lg lg:grid-cols-[1.1fr_1fr] lg:p-14">
					<div className="flex flex-col gap-5">
						<p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-600">Entry Test Preparation</p>
						<h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
							Prepare for NUST NET with Expert Guidance
						</h1>
						<p className="text-base text-slate-500 md:text-lg">
							Targeted lesson plans, simulated mocks, and adaptive analytics built to help you succeed in every NET category.
						</p>
						<div className="mt-4 flex flex-wrap gap-4">
							<Link
								to="/signup"
								className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
							>
								Get Started
							</Link>
							<Link
								to="/net"
								className="inline-flex items-center justify-center rounded-full border border-slate-300/70 bg-white px-8 py-3 font-semibold text-slate-800 shadow-md transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
							>
							Explore All Tracks
							</Link>
						</div>
					</div>
					<div className="relative flex items-center justify-center">
						<div className="absolute inset-6 rounded-[32px] bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-white opacity-70 blur-3xl" />
						<img
							src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80"
							alt="Students collaborating"
							className="relative rounded-[28px] object-cover shadow-[0_35px_70px_rgba(15,23,42,0.18)]"
							loading="lazy"
						/>
					</div>
				</section>

				<section className="mx-auto mt-6 max-w-6xl sm:mt-8 lg:mt-10">
					<header className="mx-auto max-w-3xl text-center">
						<p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">Choose Your Stream</p>
						<h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">NET Categories</h2>
						<p className="mt-4 text-base text-slate-500">
							Pick the NET variant that aligns with your aspirations and focus on the subject mix that matters most.
						</p>
					</header>

					<div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
						{tracks.map(({ id, title, description, subjects, image }) => (
							<article
								key={id}
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
										NET
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-5 p-6">
									<div className="space-y-2">
										<h3 className="text-xl font-semibold text-slate-900">{title}</h3>
										<p className="text-sm text-slate-500">{description}</p>
									</div>
									<ul className="space-y-2 text-sm text-slate-500">
										{subjects.map(({ name, weight }) => (
											<li key={name} className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-2">
												<span>{name}</span>
												<span className="font-semibold text-slate-800">{weight}%</span>
											</li>
										))}
									</ul>
									<Link
										to={`/net?track=${slugify(title)}`}
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

export default NETPrep;
