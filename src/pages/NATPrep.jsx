import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NATPrep = () => {
	const pageRef = useRef(null);
	const heroRef = useRef(null);
	const statsRef = useRef(null);
	const featuresRef = useRef(null);
	const cardsRef = useRef(null);
	const ctaRef = useRef(null);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });

		const ctx = gsap.context(() => {
			// Hero content animation
			gsap.fromTo(
				heroRef.current?.children || [],
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
			);

			// Stats animation
			const statItems = statsRef.current?.children;
			if (statItems) {
				gsap.fromTo(
					statItems,
					{ opacity: 0, y: 20, scale: 0.9 },
					{ opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" }
				);
			}

			// Features animation
			const featureItems = featuresRef.current?.children;
			if (featureItems) {
				gsap.fromTo(
					featureItems,
					{ opacity: 0, x: -30 },
					{ opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" }
				);
			}

			// Cards stagger animation
			const cards = cardsRef.current?.querySelectorAll("article");
			if (cards) {
				gsap.fromTo(
					cards,
					{ opacity: 0, y: 50, scale: 0.95 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.6,
						stagger: 0.15,
						ease: "power3.out",
						scrollTrigger: {
							trigger: cardsRef.current,
							start: "top 85%",
							toggleActions: "play none none none"
						}
					}
				);
			}

			// CTA animation
			gsap.fromTo(
				ctaRef.current,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ctaRef.current,
						start: "top 85%",
						toggleActions: "play none none none"
					}
				}
			);
		}, pageRef);

		return () => ctx.revert();
	}, []);

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
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>),
			title: "Pattern-Based MCQs",
			description: "Practice with NAT exam patterns"
		},
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>),
			title: "Study Notes",
			description: "Comprehensive NAT notes"
		},
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
			title: "Video Tutorials",
			description: "Clear topic explanations"
		},
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
			title: "Quick Revision",
			description: "Last-minute preparation"
		}
	];

	const stats = [
		{ value: "55K+", label: "Students Enrolled" },
		{ value: "3,800+", label: "Practice MCQs" },
		{ value: "40+", label: "Chapters Covered" },
		{ value: "94%", label: "Success Rate" }
	];

	return (
		<div ref={pageRef}>
			<main className="min-h-screen bg-slate-50">
				{/* Hero Section */}
				<section className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white">
					<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
						<div ref={heroRef} className="text-center">
							<span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/10 rounded-full border border-white/20">NTS Official Pattern</span>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">NAT Preparation</h1>
							<p className="text-lg text-violet-100 max-w-2xl mx-auto mb-8">Complete preparation for National Aptitude Test covering all streams with updated content.</p>
							<div ref={statsRef} className="flex flex-wrap justify-center gap-8 text-center">
								{stats.map((stat, index) => (<div key={index}><div className="text-3xl font-bold">{stat.value}</div><div className="text-violet-200 text-sm">{stat.label}</div></div>))}
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-12 bg-white border-b border-slate-200">
					<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{features.map((feature, index) => (
								<div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-violet-50 border border-violet-100">
									<div className="w-12 h-12 rounded-lg bg-violet-600 text-white flex items-center justify-center flex-shrink-0">{feature.icon}</div>
									<div><h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3><p className="text-sm text-slate-600">{feature.description}</p></div>
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

						<div ref={cardsRef} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
							{categories.map((category) => (
								<article key={category.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-violet-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
									{/* Image */}
									<div className="relative h-40 overflow-hidden flex-shrink-0">
										<img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
										{category.badge && <span className="absolute top-3 right-3 px-3 py-1 bg-violet-500 text-white text-xs font-semibold rounded-full">{category.badge}</span>}
									</div>

									{/* Content */}
									<div className="p-5 flex flex-col flex-grow">
										<h3 className="text-lg font-bold text-slate-900 mb-2">{category.title}</h3>
										<p className="text-slate-600 text-sm mb-4 flex-grow">{category.description}</p>

										{/* Subject Tags */}
										<div className="flex flex-wrap gap-1.5 mb-4">
											{category.subjects.map((subject, idx) => (
												<span key={idx} className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-md">{subject}</span>
											))}
										</div>

										{/* Stats */}
										<div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100">
											<span className="flex items-center gap-1">
												<svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
												{category.totalQuestions.toLocaleString()} MCQs
											</span>
											<span className="flex items-center gap-1">
												<svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /></svg>
												{category.students}
											</span>
										</div>

										{/* Button */}
										<Link to={`/nat/${category.id}`} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors mt-auto">
											Start Practice
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
										</Link>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section ref={ctaRef} className="py-16 bg-violet-50 border-y border-violet-100">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-slate-900 mb-4">Ready for Your NAT Exam?</h2>
						<p className="text-slate-600 mb-8 max-w-2xl mx-auto">Start your preparation journey today and secure admission to your dream university.</p>
						<Link to="/nat/nat-ie" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors text-lg">
							Begin Your Preparation
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
						</Link>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default NATPrep;
