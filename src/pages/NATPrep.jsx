import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const NATPrep = () => {
	const categories = [
		{
			id: "nat-ie",
			title: "NAT-IE (Science/Engineering)",
			description: "For Engineering, Computer Science, IT and related programs",
			subjects: ["Mathematics", "Physics", "English", "Analytical", "Quantitative"],
			totalQuestions: 2000,
			students: "30K+",
			image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
			badge: "Popular"
		},
		{
			id: "nat-iim",
			title: "NAT-IIM (Pre-Medical)",
			description: "For Medical, Nursing, Pharmacy and Allied Health programs",
			subjects: ["Biology", "Chemistry", "English", "Analytical", "Quantitative"],
			totalQuestions: 1800,
			students: "25K+",
			image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
			badge: null
		}
	];

	const features = [
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
				</svg>
			),
			title: "Pattern-Based MCQs",
			description: "Practice with NAT exam pattern questions"
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg>
			),
			title: "Study Notes",
			description: "Comprehensive notes for all NAT subjects"
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			title: "Video Tutorials",
			description: "Clear explanations for complex topics"
		},
		{
			icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
			),
			title: "Quick Revision",
			description: "Last-minute preparation material"
		}
	];

	const stats = [
		{ value: "55K+", label: "Students Enrolled" },
		{ value: "3,800+", label: "Practice MCQs" },
		{ value: "40+", label: "Chapters Covered" },
		{ value: "94%", label: "Success Rate" }
	];

	return (
		<>
			<main className="min-h-screen bg-slate-50">
				{/* Hero Section */}
				<section className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white">
					<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="text-center">
							<span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/10 rounded-full border border-white/20">
								NTS Official Pattern
							</span>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">NAT Preparation</h1>
							<p className="text-lg text-violet-100 max-w-2xl mx-auto mb-8">
								Complete preparation for National Aptitude Test (NAT) covering all streams with updated content.
							</p>
							<div className="flex flex-wrap justify-center gap-8 text-center">
								{stats.map((stat, index) => (
									<div key={index}>
										<div className="text-3xl font-bold">{stat.value}</div>
										<div className="text-violet-200 text-sm">{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-12 bg-white border-b border-slate-200">
					<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{features.map((feature, index) => (
								<div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-violet-50 border border-violet-100">
									<div className="w-12 h-12 rounded-lg bg-violet-600 text-white flex items-center justify-center flex-shrink-0">
										{feature.icon}
									</div>
									<div>
										<h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
										<p className="text-sm text-slate-600">{feature.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Categories Section */}
				<section className="py-16">
					<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-slate-900 mb-3">Choose Your Stream</h2>
							<p className="text-slate-600 max-w-xl mx-auto">Select your NAT type based on your target program</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
							{categories.map((category) => (
								<article key={category.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-violet-300 hover:shadow-xl transition-all duration-300">
									<div className="relative h-44 overflow-hidden">
										<img src={category.image} alt={category.title} className="w-full h-full object-cover" />
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
										{category.badge && (
											<span className="absolute top-4 right-4 px-3 py-1 bg-violet-500 text-white text-xs font-semibold rounded-full">
												{category.badge}
											</span>
										)}
										<div className="absolute bottom-4 left-4 right-4">
											<h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
											<p className="text-white/80 text-sm">{category.description}</p>
										</div>
									</div>

									<div className="p-5">
										<div className="flex flex-wrap gap-2 mb-4">
											{category.subjects.map((subject, idx) => (
												<span key={idx} className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-lg border border-violet-100">
													{subject}
												</span>
											))}
										</div>

										<div className="flex items-center justify-between text-sm text-slate-500 mb-5">
											<span className="flex items-center gap-1">
												<svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
												</svg>
												{category.totalQuestions.toLocaleString()} MCQs
											</span>
											<span className="flex items-center gap-1">
												<svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
												</svg>
												{category.students} Students
											</span>
										</div>

										<Link
											to={`/nat/${category.id}`}
											className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
										>
											Start Preparation
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
											</svg>
										</Link>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 bg-violet-50 border-y border-violet-100">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-slate-900 mb-4">Ready for Your NAT Exam?</h2>
						<p className="text-slate-600 mb-8 max-w-2xl mx-auto">
							Start your preparation journey today and secure admission to your dream university.
						</p>
						<Link
							to="/nat/nat-ie"
							className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors text-lg"
						>
							Begin Your Preparation
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default NATPrep;
