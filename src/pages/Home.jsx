import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CourseCard from "../components/CourseCard";
import "./Home.css";

const Home = () => {
	const containerRef = useRef(null);
	const heroRef = useRef(null);
	const testimonialsRef = useRef(null);
	const ctaRef = useRef(null);
	const courseRefs = useRef([]);
	const featuresRef = useRef([]);

	const heroIllustration = "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80";
	const courses = useMemo(() => [
		{
			title: "NET",
			description: "Prepare for the NUST Entry Test with curated study plans, mocks, and expert tips.",
			to: "/net",
			image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=400&q=80"
		},
		{
			title: "MDCAT",
			description: "Ace the Medical College Admission Test with targeted practice and smart analytics.",
			to: "/mdcat",
			image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
		},
		{
			title: "NAT",
			description: "Get ready for the National Aptitude Test with focused lessons and revision guides.",
			to: "/nat",
			image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
		}
	], []);
	const features = useMemo(() => [
		{ title: "Smart Practice", description: "Personalized practice sessions adapt to your pace and goals.", icon: "🧠" },
		{ title: "Detailed Analytics", description: "Identify strengths and gaps instantly with rich insights.", icon: "📊" },
		{ title: "Free Resources", description: "Access notes, study guides, and question banks for every exam.", icon: "📚" },
		{ title: "Progress Tracking", description: "Stay motivated with milestones and weekly progress reports.", icon: "📈" }
	], []);
	const testimonials = useMemo(() => [
		{ name: "Sarah Khan", quote: "EntryPrep helped me ace my NUST exam! The practice tests felt just like the real thing.", avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80" },
		{ name: "David Lee", quote: "I improved my MDCAT score significantly thanks to analytics and personalised practice.", avatar: "https://images.unsplash.com/photo-1544723795-432537f079d8?auto=format&fit=crop&w=160&q=80" },
		{ name: "Emily Chen", quote: "The free resources were invaluable in my NAT preparation. Highly recommend!", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80" }
	], []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		const ctx = gsap.context(() => {
			const heroTimeline = gsap.timeline({
				defaults: { ease: "power2.out" },
				scrollTrigger: { trigger: heroRef.current, start: "top 85%", once: true }
			});
			heroTimeline
				.from(heroRef.current.querySelector(".hero-inner"), { opacity: 0, y: 30, duration: 0.9 })
				.from(heroRef.current.querySelector(".hero-visual"), { opacity: 0, x: -40, duration: 0.8 }, "-=0.6")
				.from(heroRef.current.querySelector(".hero-copy"), { opacity: 0, x: 40, duration: 0.8 }, "-=0.7")
				.from(heroRef.current.querySelectorAll(".primary-btn, .ghost-btn"), { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.55");
			gsap.utils.toArray(courseRefs.current).forEach((card) => {
				if (!card) return;
				gsap.from(card, {
					scrollTrigger: { trigger: card, start: "top 85%" },
					y: 40,
					opacity: 0,
					duration: 0.8,
					ease: "power2.out"
				});
			});
			gsap.utils.toArray(featuresRef.current).forEach((feature) => {
				if (!feature) return;
				gsap.from(feature, {
					scrollTrigger: { trigger: feature, start: "top 85%" },
					y: 35,
					opacity: 0,
					duration: 0.75,
					ease: "power2.out"
				});
			});
			gsap.from(testimonialsRef.current.querySelectorAll(".testimonial"), {
				scrollTrigger: { trigger: testimonialsRef.current, start: "top 80%" },
				opacity: 0,
				scale: 0.95,
				duration: 0.8,
				stagger: 0.15,
				ease: "power2.out"
			});
			gsap.from(ctaRef.current, {
				scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
				y: 60,
				opacity: 0,
				duration: 0.9,
				ease: "power2.out"
			});
			gsap.to(ctaRef.current, {
				scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
				backgroundPosition: "200% 50%",
				duration: 12,
				repeat: -1,
				yoyo: true,
				ease: "linear"
			});
		}, containerRef);
		document.documentElement.style.scrollBehavior = "smooth";
		return () => {
			ctx.revert();
			document.documentElement.style.scrollBehavior = "";
		};
	}, []);
	return (
		<div className="home" ref={containerRef}>
			<section className="hero section" ref={heroRef}>
				<div className="hero-inner">
					<div className="hero-visual">
						<img src={heroIllustration} alt="Students studying together" />
					</div>
					<div className="hero-copy">
						<p className="hero-eyebrow">All-in-one test prep</p>
						<h1>Prepare for NUST, MDCAT &amp; NAT — All in One Place.</h1>
						<p>Practice MCQs, attempt mock tests, and improve your performance with smart analytics.</p>
						<div className="hero-actions">
							<Link to="/net" className="primary-btn">Start Preparing</Link>
							<Link to="/about" className="ghost-btn">Learn More</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="courses section">
				<header className="section-header">
					<p className="section-eyebrow">Our Exams</p>
					<h2>Choose your pathway</h2>
				</header>
				<div className="course-grid">
					{courses.map((course, index) => (
						<CourseCard
							key={course.title}
							ref={(el) => { courseRefs.current[index] = el; }}
							{...course}
						/>
					))}
				</div>
			</section>
			<section className="features section">
				<header className="section-header">
					<p className="section-eyebrow">Why Choose Us</p>
					<h2>Features built to help you succeed</h2>
				</header>
				<div className="features-grid">
					{features.map((feature, index) => (
						<div
							key={feature.title}
							className="feature-card"
							ref={(el) => { featuresRef.current[index] = el; }}
						>
							<span className="feature-icon" aria-hidden="true">{feature.icon}</span>
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
						</div>
					))}
				</div>
			</section>
			<section className="testimonials section" ref={testimonialsRef}>
				<header className="section-header">
					<p className="section-eyebrow">Student Success Stories</p>
					<h2>Hear from our toppers</h2>
				</header>
				<div className="testimonial-list">
					{testimonials.map(({ name, quote, avatar }) => (
						<article className="testimonial" key={name}>
							<img src={avatar} alt={name} />
							<h3>{name}</h3>
							<p>“{quote}”</p>
						</article>
					))}
				</div>
			</section>
			<section className="cta-banner section" ref={ctaRef}>
				<div className="cta-content">
					<h2>Boost your confidence. Start your journey today.</h2>
					<Link to="/signup" className="secondary-btn">Sign Up</Link>
				</div>
			</section>
		</div>
	);
};

export default Home;
