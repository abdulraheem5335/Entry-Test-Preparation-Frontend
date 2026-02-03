import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const ctx = gsap.context(() => {
            // Hero animation
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );

            // Section 1 - Image slides in from left, text from right
            const section1Items = section1Ref.current?.querySelectorAll('.gsap-item');
            if (section1Items) {
                gsap.fromTo(
                    section1Items[0], // Image
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section1Ref.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
                gsap.fromTo(
                    section1Items[1], // Text
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section1Ref.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Section 2 - Reversed direction
            const section2Items = section2Ref.current?.querySelectorAll('.gsap-item');
            if (section2Items) {
                gsap.fromTo(
                    section2Items[0], // Text (appears first on mobile)
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section2Ref.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
                gsap.fromTo(
                    section2Items[1], // Image
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section2Ref.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-800">
            <main className="pt-12 pb-16 md:pt-20 md:pb-24">
                <div className="container mx-auto px-6 max-w-6xl">

                    {/* Hero Header */}
                    <div ref={heroRef} className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                            About Us
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Empowering Your Success
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            We're dedicated to helping students achieve their dreams through quality education and innovative learning tools.
                        </p>
                    </div>

                    {/* Section 1: Our Mission */}
                    <section ref={section1Ref} className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="gsap-item">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto.format&fit=crop"
                                alt="Students studying collaboratively"
                                className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        <div className="gsap-item">
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 block">Our Mission</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Preparing You for Success</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We understand the challenges that come with preparing for crucial entry tests like the <strong className="font-medium text-slate-800">NET, NAT, and MDCAT</strong>. Our mission is to empower every student with the knowledge, skills, and confidence they need to ace these exams.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We believe that with the right guidance, every student can achieve their academic goals and secure admission into their dream universities.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Our Approach */}
                    <section ref={section2Ref} className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="gsap-item md:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto.format&fit=crop"
                                alt="Instructor mentoring a student"
                                className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        <div className="gsap-item md:order-1">
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 block">Our Approach</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Excellence in Education</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Our preparation material is meticulously designed by subject matter experts and experienced educators. We provide comprehensive notes, extensive question banks, and realistic mock exams.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                We focus on building concepts from the ground up, ensuring you're not just memorizing, but truly understanding the material for lasting success.
                            </p>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        {[
                            { value: '15K+', label: 'Active Students' },
                            { value: '92%', label: 'Success Rate' },
                            { value: '50+', label: 'Expert Teachers' },
                            { value: '4.9', label: 'User Rating' }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-md transition">
                                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </main>

            <footer className="bg-slate-100 border-t border-slate-200">
                <div className="container mx-auto px-6 py-8 text-center text-slate-600">
                    <p className="text-sm">© 2024 PrepSuccess. All Rights Reserved. Your Future Starts Here.</p>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;