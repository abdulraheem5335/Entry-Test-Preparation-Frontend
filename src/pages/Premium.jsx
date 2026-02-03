import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// Icon Components
const CrownIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" /><path d="M3 20h18" /></svg>;
const CheckIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>;
const XIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
const SparklesIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>;
const RocketIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
const ZapIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const ShieldIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const BookOpenIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
const VideoIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>;
const TrendingUpIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const UsersIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const HeadphonesIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>;
const ArrowLeftIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const GiftIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 12 20 22 4 22 4 12" /><rect width="20" height="5" x="2" y="7" rx="1" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>;

const GlowingCard = ({ children, className = "" }) => (
    <div className={`relative ${className}`}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 h-full">
            {children}
        </div>
    </div>
);

const Premium = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");
    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const plansRef = useRef(null);
    const featuresRef = useRef(null);

    // GSAP Animations
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            );

            // Pricing cards stagger
            const planCards = plansRef.current?.children;
            if (planCards) {
                gsap.fromTo(
                    planCards,
                    { opacity: 0, y: 50, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, delay: 0.3, ease: 'power2.out' }
                );
            }

            // Features cards stagger
            const featureCards = featuresRef.current?.children;
            if (featureCards) {
                gsap.fromTo(
                    featureCards,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.6, ease: 'power2.out' }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const plans = [
        {
            name: "Free",
            priceMonthly: 0,
            priceYearly: 0,
            description: "Get started with essential features",
            features: [
                "Access to 1 exam track",
                "100 MCQs per subject",
                "Basic notes access",
                "Community forum access",
                "Mobile app access"
            ],
            notIncluded: ["Video lectures", "Mock tests", "AI analytics", "Priority support", "Study plans"],
            popular: false,
            gradient: "from-slate-400 to-slate-600",
            bgGradient: "from-slate-50 to-slate-100",
            icon: <GiftIcon className="w-6 h-6" />,
            buttonText: "Current Plan",
            buttonStyle: "bg-slate-200 text-slate-600 cursor-default"
        },
        {
            name: "Pro",
            priceMonthly: 499,
            priceYearly: 399,
            description: "Everything you need to succeed",
            features: [
                "Access to ALL exam tracks",
                "Unlimited MCQs",
                "Comprehensive notes",
                "Video lectures library",
                "Unlimited mock tests",
                "Progress analytics",
                "Personalized study plans",
                "Email support"
            ],
            notIncluded: ["1-on-1 mentorship", "Priority support"],
            popular: true,
            gradient: "blue",
            bgGradient: "from-blue-50 to-slate-50",
            icon: <RocketIcon className="w-6 h-6" />,
            buttonText: "Get Started",
            buttonStyle: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        },
        {
            name: "Ultimate",
            priceMonthly: 999,
            priceYearly: 799,
            description: "Maximum preparation with personal guidance",
            features: [
                "Everything in Pro",
                "1-on-1 mentorship sessions",
                "AI-powered predictions",
                "Smart weak area detection",
                "Priority 24/7 support",
                "Early access to content",
                "Downloadable resources",
                "Exclusive study groups",
                "Exam strategy sessions"
            ],
            notIncluded: [],
            popular: false,
            gradient: "blue",
            bgGradient: "from-slate-50 to-blue-50",
            icon: <CrownIcon className="w-6 h-6" />,
            buttonText: "Go Ultimate",
            buttonStyle: "bg-blue-700 text-white hover:bg-blue-800 shadow-sm"
        }
    ];

    const features = [
        {
            icon: <BookOpenIcon className="w-6 h-6" />,
            title: "10x More MCQs",
            desc: "Practice with unlimited questions across all subjects",
            iconBg: "bg-blue-600"
        },
        {
            icon: <VideoIcon className="w-6 h-6" />,
            title: "Video Lectures",
            desc: "Learn from expert instructors with HD videos",
            iconBg: "bg-violet-600"
        },
        {
            icon: <TrendingUpIcon className="w-6 h-6" />,
            title: "AI Analytics",
            desc: "Smart insights to track your progress",
            iconBg: "bg-emerald-600"
        },
        {
            icon: <UsersIcon className="w-6 h-6" />,
            title: "Mentorship",
            desc: "1-on-1 guidance from top scorers",
            iconBg: "bg-rose-600"
        }
    ];

    const faqs = [
        {
            q: "Can I cancel anytime?",
            a: "Yes, you can cancel your subscription at any time. No questions asked. Your access continues until the end of your billing period."
        },
        {
            q: "What payment methods are accepted?",
            a: "We accept JazzCash, EasyPaisa, credit/debit cards, and bank transfers for your convenience."
        },
        {
            q: "Is there a free trial?",
            a: "The Free plan gives you access to basic features forever! Upgrade anytime to unlock premium content."
        },
        {
            q: "Can I switch plans?",
            a: "Absolutely! You can upgrade or downgrade your plan at any time. We'll prorate the difference."
        }
    ];

    return (
        <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold mb-4 shadow-sm">
                        <SparklesIcon className="w-4 h-4" />
                        Special Launch Offer
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-violet-700 bg-clip-text text-transparent mb-3">
                        Unlock Your Full Potential
                    </h1>
                    <p className="text-slate-500 max-w-xl mx-auto text-lg">
                        Join thousands of students who are acing their entry tests with our premium features
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-200 inline-flex">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${billingCycle === 'monthly'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-600 hover:text-slate-800'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${billingCycle === 'yearly'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-600 hover:text-slate-800'
                                }`}
                        >
                            Yearly
                            <span className={`text-xs px-2 py-0.5 rounded-full ${billingCycle === 'yearly'
                                ? 'bg-white/20'
                                : 'bg-emerald-100 text-emerald-700'
                                }`}>
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div ref={plansRef} className="grid md:grid-cols-3 gap-6 mb-12">
                    {plans.map(plan => (
                        <div key={plan.name} className="relative group">
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-sm inline-flex items-center gap-1">
                                        <ZapIcon className="w-3 h-3" />
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            <GlowingCard
                                className={`h-full ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                            >
                                <div className={`p-6 rounded-t-2xl bg-gradient-to-br ${plan.bgGradient}`}>
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${plan.name === 'Free' ? 'bg-slate-500' : 'bg-blue-600'} text-white mb-4 shadow-sm`}>
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{plan.description}</p>

                                    <div className="mt-4">
                                        <div className="flex items-baseline gap-1">
                                            {plan.priceMonthly === 0 ? (
                                                <span className="text-4xl font-bold text-slate-900">Free</span>
                                            ) : (
                                                <>
                                                    <span className="text-sm text-slate-500">Rs.</span>
                                                    <span className="text-4xl font-bold text-slate-900">
                                                        {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                                                    </span>
                                                    <span className="text-slate-500">/month</span>
                                                </>
                                            )}
                                        </div>
                                        {billingCycle === 'yearly' && plan.priceYearly > 0 && (
                                            <p className="text-sm text-emerald-600 font-medium mt-1">
                                                Billed Rs. {plan.priceYearly * 12}/year - Save Rs. {(plan.priceMonthly - plan.priceYearly) * 12}
                                            </p>
                                        )}
                                        {plan.priceMonthly === 0 && (
                                            <p className="text-sm text-slate-500 mt-1">Forever free</p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className={`w-5 h-5 rounded-full ${plan.name === 'Free' ? 'bg-slate-500' : 'bg-blue-600'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                    <CheckIcon className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-sm text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                        {plan.notIncluded.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 opacity-50">
                                                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <XIcon className="w-3 h-3 text-slate-400" />
                                                </div>
                                                <span className="text-sm text-slate-500 line-through">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${plan.buttonStyle} ${plan.priceMonthly > 0 ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
                                            }`}
                                        disabled={plan.priceMonthly === 0}
                                    >
                                        {plan.buttonText}
                                    </button>
                                </div>
                            </GlowingCard>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-slate-900 text-center mb-8">Why Go Premium?</h3>
                    <div ref={featuresRef} className="grid md:grid-cols-4 gap-4">
                        {features.map((feature, i) => (
                            <GlowingCard key={i}>
                                <div className="p-6 text-center">
                                    <div className={`w-12 h-12 rounded-xl ${feature.iconBg} text-white flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                                    <p className="text-sm text-slate-500">{feature.desc}</p>
                                </div>
                            </GlowingCard>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-2 text-slate-600">
                        <ShieldIcon className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium">Secure Payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <ZapIcon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Instant Access</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <HeadphonesIcon className="w-5 h-5 text-violet-600" />
                        <span className="text-sm font-medium">24/7 Support</span>
                    </div>
                </div>

                {/* FAQ */}
                <GlowingCard className="mb-8">
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-slate-200 transition">
                                    <h4 className="font-semibold text-slate-900 mb-2">{faq.q}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlowingCard>

                {/* Back Link */}
                <div className="text-center">
                    <Link
                        to="/profile/dashboard"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition group"
                    >
                        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Premium;
