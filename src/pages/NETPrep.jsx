import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NETPrep = () => {
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
						stagger: 0.12,
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
			id: "net-engineering",
			title: "NET-Engineering",
			description: "For Engineering & Computing programs. Pre-Eng/ICS/Pre-Med with Additional Math.",
			subjects: ["Mathematics", "Physics", "English"],
			totalQuestions: 2000,
			students: "35K+",
			image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80",
			badge: "Popular"
		},
		{
			id: "net-applied-sciences",
			title: "NET-Applied Sciences",
			description: "For Pre-Medical students applying to Biotechnology, Chemistry, etc.",
			subjects: ["Biology", "Chemistry", "English"],
			totalQuestions: 1800,
			students: "20K+",
			image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
			badge: null
		},
		{
			id: "net-business-social-sciences",
			title: "NET-Business & Social",
			description: "For any HSSC background applying to BBA, Economics, LLB, etc.",
			subjects: ["Quantitative Math", "English"],
			totalQuestions: 1500,
			students: "25K+",
			image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
			badge: null
		},
		{
			id: "net-architecture",
			title: "NET-Architecture",
			description: "For students applying to Architecture or Industrial Design programs.",
			subjects: ["Design Aptitude", "Mathematics", "English"],
			totalQuestions: 1200,
			students: "10K+",
			image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=400&q=80",
			badge: null
		},
		{
			id: "net-natural-sciences",
			title: "NET-Natural Sciences",
			description: "For BS Mathematics, Physics, or Chemistry from other backgrounds.",
			subjects: ["Mathematics", "English"],
			totalQuestions: 1400,
			students: "15K+",
			image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80",
			badge: null
		}
	];

	const features = [
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>),
			title: "Past Paper MCQs",
			description: "Practice with actual NUST NET questions"
		},
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>),
			title: "Detailed Notes",
			description: "Comprehensive study material for NUST"
		},
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
			title: "Video Lectures",
			description: "Expert explanations for concepts"
		},
		{
			icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
			title: "Progress Tracking",
			description: "Monitor your preparation"
		}
	];

	const stats = [
		{ value: "35K+", label: "Students Enrolled" },
		{ value: "8,000+", label: "Practice MCQs" },
		{ value: "5", label: "NET Tracks" },
		{ value: "96%", label: "Success Rate" }
	];

	return (
		<div ref={pageRef}>
			<main className="min-h-screen bg-slate-50">
				{/* Hero Section */}
				<section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
					<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
						<div ref={heroRef} className="text-center">
							<span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/10 rounded-full border border-white/20">NUST Entry Test Preparation</span>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">NUST NET Preparation</h1>
							<p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">Comprehensive preparation for NUST Entry Test with adaptive study plans, realistic mocks, and subject-weighted insights.</p>
							<div ref={statsRef} className="flex flex-wrap justify-center gap-8 text-center">
								{stats.map((stat, index) => (<div key={index}><div className="text-3xl font-bold">{stat.value}</div><div className="text-blue-200 text-sm">{stat.label}</div></div>))}
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-12 bg-white border-b border-slate-200">
					<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{features.map((feature, index) => (
								<div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
									<div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">{feature.icon}</div>
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
							<h2 className="text-3xl font-bold text-slate-900 mb-3">Choose Your NET Track</h2>
							<p className="text-slate-600 max-w-xl mx-auto">Select your preparation track based on your target program at NUST</p>
						</div>

						<div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{categories.map((category) => (
								<article key={category.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
									{/* Image */}
									<div className="relative h-40 overflow-hidden flex-shrink-0">
										<img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
										{category.badge && <span className="absolute top-3 right-3 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">{category.badge}</span>}
									</div>

									{/* Content */}
									<div className="p-5 flex flex-col flex-grow">
										<h3 className="text-lg font-bold text-slate-900 mb-2">{category.title}</h3>
										<p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{category.description}</p>

										{/* Subject Tags */}
										<div className="flex flex-wrap gap-1.5 mb-4">
											{category.subjects.map((subject, idx) => (
												<span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">{subject}</span>
											))}
										</div>

										{/* Stats */}
										<div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100">
											<span className="flex items-center gap-1">
												<svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
												{category.totalQuestions.toLocaleString()} MCQs
											</span>
											<span className="flex items-center gap-1">
												<svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /></svg>
												{category.students}
											</span>
										</div>

										{/* Button */}
										<Link to={`/net/${category.id}`} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors mt-auto">
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
				<section ref={ctaRef} className="py-16 bg-blue-50 border-y border-blue-100">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Crack NUST NET?</h2>
						<p className="text-slate-600 mb-8 max-w-2xl mx-auto">Join thousands of successful students who secured their spot at NUST.</p>
						<Link to="/net/net-engineering" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-lg">
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

export default NETPrep;
